"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { ColumnDef, Row } from "@/types";

const TAG_COLORS = [
	"bg-red-500/15 text-red-300",
	"bg-orange-500/15 text-orange-300",
	"bg-amber-500/15 text-amber-300",
	"bg-yellow-500/15 text-yellow-300",
	"bg-lime-500/15 text-lime-300",
	"bg-green-500/15 text-green-300",
	"bg-emerald-500/15 text-emerald-300",
	"bg-teal-500/15 text-teal-300",
	"bg-cyan-500/15 text-cyan-300",
	"bg-sky-500/15 text-sky-300",
	"bg-blue-500/15 text-blue-300",
	"bg-indigo-500/15 text-indigo-300",
	"bg-violet-500/15 text-violet-300",
	"bg-purple-500/15 text-purple-300",
	"bg-fuchsia-500/15 text-fuchsia-300",
	"bg-pink-500/15 text-pink-300",
	"bg-rose-500/15 text-rose-300",
	"bg-slate-500/15 text-slate-300",
	"bg-stone-500/15 text-stone-300",
	"bg-zinc-500/15 text-zinc-300",
];

function buildColorMap(columns: ColumnDef[]): Map<string, number> {
	const map = new Map<string, number>();
	let idx = 0;
	for (const col of columns) {
		if (col.options && (col.type === "select" || col.type === "status")) {
			for (const opt of col.options) {
				map.set(`${col.name}::${opt.name}`, idx++);
			}
		}
	}
	return map;
}

function PropertyDropdown({
	label,
	options,
	selected,
	onChange,
}: {
	label: string;
	options: string[];
	selected: string;
	onChange: (option: string) => void;
}) {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!open) return;
		const handler = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, [open]);

	return (
		<div className="relative" ref={ref}>
			<button
				type="button"
				onClick={() => setOpen(!open)}
				className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border rounded-md transition-colors bg-background border-border text-foreground-body hover:text-foreground-title hover:border-foreground-body/40"
			>
				{label}
				<span className="text-foreground-title font-semibold">
					{selected}
				</span>
				<ChevronDown className="size-3" />
			</button>
			{open && (
				<div className="absolute top-full left-0 mt-1 min-w-[180px] bg-popover border border-border rounded-md shadow-lg z-50 py-1">
					{options.map(opt => (
						<button
							key={opt}
							type="button"
							onClick={() => {
								onChange(opt);
								setOpen(false);
							}}
							className={cn(
								"flex items-center w-full px-3 py-1.5 text-sm text-left transition-colors",
								opt === selected
									? "text-foreground-title bg-muted font-medium"
									: "text-foreground-body hover:bg-muted",
							)}
						>
							{opt}
						</button>
					))}
				</div>
			)}
		</div>
	);
}

function renderTag(
	value: string | null,
	colName: string,
	colorMap: Map<string, number>,
) {
	if (!value) return null;
	const key = `${colName}::${value}`;
	const idx = colorMap.get(key) ?? 0;
	const colorClass = TAG_COLORS[idx % TAG_COLORS.length];
	return (
		<span
			className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${colorClass}`}
		>
			{value}
		</span>
	);
}

export default function ReadingKanban({
	columns,
	rows,
}: {
	columns: ColumnDef[];
	rows: Row[];
}) {
	const colorMap = useMemo(() => buildColorMap(columns), [columns]);

	const groupableColumns = useMemo(
		() =>
			columns.filter(
				c =>
					(c.type === "select" || c.type === "status") &&
					c.options &&
					c.options.length > 0,
			),
		[columns],
	);

	const [selectedProp, setSelectedProp] = useState<string>(() => {
		if (groupableColumns.length > 0) return groupableColumns[0].name;
		return "";
	});

	const titleCol = useMemo(
		() => columns.find(c => c.type === "title"),
		[columns],
	);

	const groupedData = useMemo(() => {
		if (!selectedProp || !titleCol) return { columns: [], unmapped: [] };

		const groupCol = columns.find(c => c.name === selectedProp);
		if (!groupCol?.options) return { columns: [], unmapped: [] };

		const optionNames = groupCol.options.map(o => o.name);
		const groups = new Map<string, Row[]>();
		for (const name of optionNames) {
			groups.set(name, []);
		}

		const unmapped: Row[] = [];

		for (const row of rows) {
			const val = row.cells[selectedProp];
			if (!val) {
				unmapped.push(row);
				continue;
			}

			const bucket = groups.get(val);
			if (bucket) {
				bucket.push(row);
			} else {
				unmapped.push(row);
			}
		}

		const result = optionNames
			.filter(name => {
				const bucket = groups.get(name);
				return bucket && bucket.length > 0;
			})
			.map(name => ({
				name,
				rows: groups.get(name) || [],
			}));

		return { columns: result, unmapped };
	}, [selectedProp, columns, rows, titleCol]);

	const otherCols = useMemo(
		() =>
			columns.filter(c => c.type !== "title" && c.name !== selectedProp),
		[columns, selectedProp],
	);

	if (rows.length === 0) {
		return <p className="text-foreground-body">No entries yet.</p>;
	}

	if (groupableColumns.length === 0) {
		return (
			<p className="text-foreground-body">
				No categorical properties available for kanban view.
			</p>
		);
	}

	return (
		<div>
			<div className="mb-4">
				<div className="flex items-center gap-2">
					<span className="text-xs text-foreground-body">
						Group by
					</span>
					<PropertyDropdown
						label=""
						options={groupableColumns.map(c => c.name)}
						selected={selectedProp}
						onChange={setSelectedProp}
					/>
				</div>
			</div>

			<div className="flex gap-4 overflow-x-auto pb-4">
				{groupedData.columns.map(col => (
					<div
						key={col.name}
						className="min-w-[280px] max-w-[320px] shrink-0 flex flex-col"
					>
						<div className="flex items-center gap-2 mb-3 px-1">
							{renderTag(col.name, selectedProp, colorMap)}
							<span className="text-xs text-foreground-body tabular-nums">
								{col.rows.length}
							</span>
						</div>
						<div className="flex flex-col gap-2">
							{col.rows.map(row => (
								<KanbanCard
									key={row.id}
									row={row}
									titleCol={titleCol}
									otherCols={otherCols}
									colorMap={colorMap}
								/>
							))}
						</div>
					</div>
				))}

				{groupedData.unmapped.length > 0 && (
					<div className="min-w-[280px] max-w-[320px] shrink-0 flex flex-col">
						<div className="flex items-center gap-2 mb-3 px-1">
							<span className="text-xs text-foreground-body font-medium">
								Unset
							</span>
							<span className="text-xs text-foreground-body tabular-nums">
								{groupedData.unmapped.length}
							</span>
						</div>
						<div className="flex flex-col gap-2">
							{groupedData.unmapped.map(row => (
								<KanbanCard
									key={row.id}
									row={row}
									titleCol={titleCol}
									otherCols={otherCols}
									colorMap={colorMap}
								/>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

function KanbanCard({
	row,
	titleCol,
	otherCols,
	colorMap,
}: {
	row: Row;
	titleCol: ColumnDef | undefined;
	otherCols: ColumnDef[];
	colorMap: Map<string, number>;
}) {
	const title = titleCol ? row.cells[titleCol.name] : null;

	const visibleProps = otherCols.filter(
		c => row.cells[c.name] && c.type !== "files",
	);

	return (
		<div className="bg-card border border-border rounded-md p-3 flex flex-col gap-1.5">
			{title && (
				<p className="text-sm font-medium text-foreground-title leading-snug">
					{title}
				</p>
			)}
			{visibleProps.length > 0 && (
				<div className="flex flex-wrap gap-1.5 mt-1">
					{visibleProps.map(col => {
						const val = row.cells[col.name];
						if (col.type === "select" || col.type === "status") {
							return (
								<span key={col.name}>
									{renderTag(val, col.name, colorMap)}
								</span>
							);
						}
						return (
							<span
								key={col.name}
								className="text-[11px] text-foreground-body"
							>
								{val}
							</span>
						);
					})}
				</div>
			)}
		</div>
	);
}
