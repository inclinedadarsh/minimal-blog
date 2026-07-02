"use client";

import { ArrowDown, ArrowUp, ChevronDown, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
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

function FilterDropdown({
	label,
	options,
	selected,
	onChange,
}: {
	label: string;
	options: string[];
	selected: Set<string>;
	onChange: (option: string, checked: boolean) => void;
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
				className={cn(
					"inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border rounded-md transition-colors",
					selected.size > 0
						? "bg-foreground-title/10 border-foreground-title/30 text-foreground-title"
						: "bg-background border-border text-foreground-body hover:text-foreground-title hover:border-foreground-body/40",
				)}
			>
				{label}
				{selected.size > 0 && (
					<span className="size-4 rounded-full bg-foreground-title/20 text-[10px] flex items-center justify-center">
						{selected.size}
					</span>
				)}
				<ChevronDown className="size-3" />
			</button>
			{open && (
				<div className="absolute top-full left-0 mt-1 min-w-[160px] bg-popover border border-border rounded-md shadow-lg z-50 py-1">
					{options.map(opt => {
						const checked = selected.has(opt);
						return (
							<label
								key={opt}
								className="flex items-center gap-2 px-3 py-1.5 text-sm cursor-pointer hover:bg-muted transition-colors"
							>
								<input
									type="checkbox"
									checked={checked}
									onChange={() => onChange(opt, !checked)}
									className="accent-foreground-title"
								/>
								<span
									className={
										checked
											? "text-foreground-title"
											: "text-foreground-body"
									}
								>
									{opt}
								</span>
							</label>
						);
					})}
				</div>
			)}
		</div>
	);
}

export default function ReadingTable({
	columns,
	rows,
}: {
	columns: ColumnDef[];
	rows: Row[];
}) {
	const [search, setSearch] = useState("");
	const [filters, setFilters] = useState<Record<string, Set<string>>>({});
	const [sort, setSort] = useState<{
		column: string;
		dir: "asc" | "desc";
	} | null>(null);

	const colorMap = useMemo(() => buildColorMap(columns), [columns]);

	const hasActiveFilters = search || Object.keys(filters).length > 0 || sort;

	const filterableColumns = useMemo(
		() =>
			columns.filter(
				c =>
					(c.type === "select" || c.type === "status") &&
					c.options &&
					c.options.length > 0,
			),
		[columns],
	);

	const processedRows = useMemo(() => {
		let result = rows;

		if (search) {
			const q = search.toLowerCase();
			result = result.filter(row =>
				Object.values(row.cells).some(v =>
					v?.toLowerCase().includes(q),
				),
			);
		}

		for (const [colName, selected] of Object.entries(filters)) {
			if (selected.size === 0) continue;
			result = result.filter(row =>
				selected.has(row.cells[colName] ?? ""),
			);
		}

		if (sort) {
			result = [...result].sort((a, b) => {
				const aVal = a.cells[sort.column] ?? "";
				const bVal = b.cells[sort.column] ?? "";
				const cmp = aVal.localeCompare(bVal);
				return sort.dir === "asc" ? cmp : -cmp;
			});
		} else {
			result = [...result].sort((a, b) =>
				b.lastEditedTime.localeCompare(a.lastEditedTime),
			);
		}

		return result;
	}, [rows, search, filters, sort]);

	function toggleFilter(colName: string, option: string) {
		setFilters(prev => {
			const next = { ...prev };
			const set = new Set(next[colName] || []);
			if (set.has(option)) set.delete(option);
			else set.add(option);
			if (set.size === 0) delete next[colName];
			else next[colName] = set;
			return next;
		});
	}

	function resetFilters() {
		setSearch("");
		setFilters({});
		setSort(null);
	}

	function toggleSort(colName: string) {
		setSort(prev => {
			if (!prev || prev.column !== colName)
				return { column: colName, dir: "asc" };
			if (prev.dir === "asc") return { column: colName, dir: "desc" };
			return null;
		});
	}

	if (rows.length === 0) {
		return <p className="text-foreground-body">No entries yet.</p>;
	}

	return (
		<div>
			<div className="mb-4 space-y-3">
				<div className="relative">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-foreground-body" />
					<input
						type="text"
						placeholder="Search..."
						value={search}
						onChange={e => setSearch(e.target.value)}
						className="w-full h-9 pl-9 pr-3 text-sm bg-background border border-border rounded-md placeholder:text-foreground-body/50 focus:outline-none focus:ring-1 focus:ring-ring text-foreground-title"
					/>
				</div>
				<div className="flex items-start justify-between gap-4">
					{filterableColumns.length > 0 && (
						<div className="flex flex-wrap gap-2">
							{filterableColumns.map(col => (
								<FilterDropdown
									key={col.name}
									label={col.name}
									options={col.options!.map(o => o.name)}
									selected={filters[col.name] ?? new Set()}
									onChange={opt =>
										toggleFilter(col.name, opt)
									}
								/>
							))}
						</div>
					)}
					{hasActiveFilters && (
						<button
							type="button"
							onClick={resetFilters}
							className="shrink-0 text-xs text-foreground-body hover:text-foreground-title transition-colors mt-1"
						>
							Reset filters
						</button>
					)}
				</div>
			</div>

			<Table>
				<TableHeader>
					<TableRow>
						{columns.map(col => (
							<TableHead
								key={col.name}
								className={cn(
									"cursor-pointer select-none",
									col.type === "title" && "max-w-[250px]",
								)}
								onClick={() => toggleSort(col.name)}
							>
								<span className="inline-flex items-center gap-1">
									{col.name}
									{sort?.column === col.name &&
										(sort.dir === "asc" ? (
											<ArrowUp className="size-3" />
										) : (
											<ArrowDown className="size-3" />
										))}
								</span>
							</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody>
					{processedRows.length === 0 ? (
						<TableRow>
							<TableCell
								colSpan={columns.length}
								className="text-center text-foreground-body py-8"
							>
								No results match your filters.
							</TableCell>
						</TableRow>
					) : (
						processedRows.map(row => (
							<TableRow key={row.id}>
								{columns.map(col => (
									<TableCell
										key={col.name}
										className={cn(
											col.type === "title" &&
												"max-w-[250px] whitespace-normal font-medium",
										)}
									>
										{col.type === "select" ||
										col.type === "status"
											? renderTag(
													row.cells[col.name],
													col.name,
													colorMap,
												)
											: (row.cells[col.name] ?? "—")}
									</TableCell>
								))}
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</div>
	);
}

function renderTag(
	value: string | null,
	colName: string,
	colorMap: Map<string, number>,
) {
	if (!value) return "—";
	const key = `${colName}::${value}`;
	const idx = colorMap.get(key) ?? 0;
	const colorClass = TAG_COLORS[idx % TAG_COLORS.length];
	return (
		<span
			className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colorClass}`}
		>
			{value}
		</span>
	);
}
