import {
	Client,
	collectPaginatedAPI,
	isFullDataSource,
	isFullPage,
} from "@notionhq/client";
import { NextResponse } from "next/server";
import type { ColumnDef, Row } from "@/types";

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const DATA_SOURCE_ID = process.env.NOTION_READING_DATA_SOURCE_ID || "";

const VISIBLE_TYPES = new Set([
	"title",
	"rich_text",
	"select",
	"status",
	"multi_select",
	"date",
	"number",
	"email",
	"phone_number",
	"checkbox",
	"files",
]);

export const dynamic = "force-dynamic";

export async function GET() {
	try {
		if (!process.env.NOTION_TOKEN || !DATA_SOURCE_ID) {
			return NextResponse.json(
				{ error: "Notion API is not configured." },
				{ status: 500 },
			);
		}

		const dataSource = await notion.dataSources.retrieve({
			data_source_id: DATA_SOURCE_ID,
		});

		if (!isFullDataSource(dataSource)) {
			return NextResponse.json(
				{ error: "Could not retrieve data source schema." },
				{ status: 500 },
			);
		}

		const columns: ColumnDef[] = [];
		const queryProperties: string[] = [];

		for (const [name, config] of Object.entries(dataSource.properties)) {
			if (!VISIBLE_TYPES.has(config.type)) continue;

			let options: { id: string; name: string }[] | undefined;
			if (config.type === "select") {
				options = config.select.options.map(o => ({
					id: o.id,
					name: o.name,
				}));
			} else if (config.type === "status") {
				options = config.status.options.map(o => ({
					id: o.id,
					name: o.name,
				}));
			}

			columns.push({ id: config.id, name, type: config.type, options });
			queryProperties.push(name);
		}

		// Move the title column to the front — it's the page name / main column
		const titleIdx = columns.findIndex(c => c.type === "title");
		if (titleIdx > 0) {
			const [titleCol] = columns.splice(titleIdx, 1);
			columns.unshift(titleCol);
		}

		const results = await collectPaginatedAPI(notion.dataSources.query, {
			data_source_id: DATA_SOURCE_ID,
			filter_properties: queryProperties,
			sorts: [{ timestamp: "last_edited_time", direction: "descending" }],
			page_size: 100,
		});

		const rows: Row[] = results.filter(isFullPage).map(page => {
			const cells: Record<string, string | null> = {};

			for (const propName of queryProperties) {
				cells[propName] = extractCellValue(page, propName);
			}

			return {
				id: page.id,
				cells,
				createdTime: page.created_time,
				lastEditedTime: page.last_edited_time,
			};
		});

		return NextResponse.json({
			columns,
			rows,
		});
	} catch (error) {
		console.error("Reading list API error:", error);
		return NextResponse.json(
			{
				error:
					error instanceof Error
						? error.message
						: "Failed to load reading list.",
			},
			{ status: 500 },
		);
	}
}

function extractCellValue(
	// biome-ignore lint/suspicious/noExplicitAny: Notion property union is too complex to narrow statically
	page: any,
	propName: string,
): string | null {
	const prop = page.properties?.[propName];
	if (!prop) return null;

	switch (prop.type) {
		case "title":
			// biome-ignore lint/suspicious/noExplicitAny: Notion property union too complex
			return (
				prop.title?.map((t: any) => t.plain_text || "").join("") || null
			);
		case "rich_text":
			// biome-ignore lint/suspicious/noExplicitAny: same reason
			return (
				prop.rich_text?.map((t: any) => t.plain_text || "").join("") ||
				null
			);
		case "select":
			return prop.select?.name ?? null;
		case "status":
			return prop.status?.name ?? null;
		case "url":
			return prop.url ?? null;
		case "number":
			return prop.number != null ? String(prop.number) : null;
		case "email":
			return prop.email ?? null;
		case "phone_number":
			return prop.phone_number ?? null;
		case "checkbox":
			return prop.checkbox ? "Yes" : "No";
		case "date":
			return prop.date?.start ?? null;
		case "multi_select":
			// biome-ignore lint/suspicious/noExplicitAny: same reason
			return (
				prop.multi_select?.map((m: any) => m.name).join(", ") || null
			);
		case "files":
			return prop.files?.length ? `${prop.files.length} file(s)` : null;
		default:
			return null;
	}
}
