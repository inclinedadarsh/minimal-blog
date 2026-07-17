"use client";

import { Columns3, Loader2, Table } from "lucide-react";
import { useEffect, useState } from "react";
import ReadingKanban from "@/components/ReadingKanban";
import ReadingTable from "@/components/ReadingTable";
import { cn } from "@/lib/utils";
import type { ColumnDef, Row } from "@/types";

export default function ReadingPage() {
	const [data, setData] = useState<{
		columns: ColumnDef[];
		rows: Row[];
	} | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [view, setView] = useState<"table" | "board">("table");

	useEffect(() => {
		fetch("/api/reading")
			.then(res => res.json())
			.then(json => {
				if (json.error) {
					setError(json.error);
				} else {
					setData(json);
				}
			})
			.catch(err => setError(err.message))
			.finally(() => setLoading(false));
	}, []);

	return (
		<div className="container mx-auto md:mt-5">
			<h1 className="text-3xl md:text-[40px] font-semibold font-serif mb-5 md:mb-6 text-foreground-title">
				Reading List
			</h1>
			<p className="text-foreground-body mb-8 md:mb-10 leading-relaxed">
				This web page contains (almost) all the blogs, books, etc. I
				have ever read or I'm interested in reading. Moreover, I have
				also categorized them accordingly and have added resources
				wherever I can.
				<br />
				<br />
				This website is inspired by{" "}
				<a
					href="https://readinglibrary.vercel.app/"
					target="_blank"
					rel="noopener noreferrer"
					className="underline underline-offset-2 hover:text-foreground-title transition-colors"
				>
					@astledsa's reading library
				</a>
				.
			</p>

			{loading ? (
				<div className="flex justify-center py-20">
					<Loader2 className="size-8 animate-spin text-foreground-body" />
				</div>
			) : error ? (
				<p className="text-red-400">{error}</p>
			) : data ? (
				<div>
					<div className="flex items-center gap-1 mb-4 border border-border rounded-md p-0.5 w-fit">
						<button
							type="button"
							onClick={() => setView("table")}
							className={cn(
								"inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors",
								view === "table"
									? "bg-muted text-foreground-title"
									: "text-foreground-body hover:text-foreground-title",
							)}
						>
							<Table className="size-3.5" />
							Table
						</button>
						<button
							type="button"
							onClick={() => setView("board")}
							className={cn(
								"inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors",
								view === "board"
									? "bg-muted text-foreground-title"
									: "text-foreground-body hover:text-foreground-title",
							)}
						>
							<Columns3 className="size-3.5" />
							Board
						</button>
					</div>
					{view === "table" ? (
						<ReadingTable columns={data.columns} rows={data.rows} />
					) : (
						<ReadingKanban
							columns={data.columns}
							rows={data.rows}
						/>
					)}
				</div>
			) : null}
		</div>
	);
}
