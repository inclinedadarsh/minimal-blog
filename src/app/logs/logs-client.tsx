"use client";

import { ArrowUpDown, RefreshCw } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import DevlogDialog from "@/components/devlog-dialog";
import DevlogCard from "@/components/devlogs-card";
import { cn } from "@/lib/utils";
import type { DevlogEntry } from "@/types/devlog";
import { revalidateDevlogs } from "./actions";

export default function LogsClient({
	initialDevlogs,
}: {
	initialDevlogs: DevlogEntry[];
}) {
	const [devlogs, setDevlogs] = useState<DevlogEntry[]>(initialDevlogs);
	const [selectedDevlog, setSelectedDevlog] = useState<DevlogEntry | null>(
		null,
	);
	const [isLoading, setIsLoading] = useState(false);
	const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

	const sortedDevlogs = useMemo(
		() =>
			[...devlogs].sort((a, b) =>
				sortOrder === "desc"
					? b.number - a.number
					: a.number - b.number,
			),
		[devlogs, sortOrder],
	);

	const handleRefresh = useCallback(async () => {
		setIsLoading(true);
		const startedAt = Date.now();
		const result = await revalidateDevlogs();
		if (result.error) {
			setDevlogs([]);
		} else {
			setDevlogs(result.devlogs);
		}
		const elapsed = Date.now() - startedAt;
		if (elapsed < 400) {
			setTimeout(() => setIsLoading(false), 400 - elapsed);
		} else {
			setIsLoading(false);
		}
	}, []);

	return (
		<div className="container mx-auto md:mt-5">
			<div className="flex md:items-center justify-between flex-col md:flex-row mb-5 md:mb-10 gap-4">
				<h1 className="text-3xl md:text-[40px] font-semibold font-serif text-foreground-title">
					Dev Logs
				</h1>
				<div className="flex items-center gap-2">
					<button
						onClick={() =>
							setSortOrder(prev =>
								prev === "desc" ? "asc" : "desc",
							)
						}
						className="text-foreground-title px-2 py-1 border border-border rounded-sm leading-[150%] hover:border-foreground-body/40 transition-colors w-fit flex gap-2 items-center"
						type="button"
						aria-label="Toggle sort order"
					>
						{sortOrder === "desc" ? "Latest First" : "Oldest First"}
						<ArrowUpDown className="size-4" />
					</button>
					<button
						onClick={handleRefresh}
						type="button"
						disabled={isLoading}
						aria-label="Refresh dev logs"
						className="text-foreground-title px-2 py-2 border border-border rounded-sm leading-[150%] hover:border-foreground-body/40 transition-colors w-fit flex gap-2 items-center"
					>
						<RefreshCw
							className={cn(
								"size-4",
								isLoading && "animate-spin",
							)}
						/>
					</button>
				</div>
			</div>
			{devlogs.length === 0 ? (
				<p className="text-foreground-body">No devlogs yet.</p>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{sortedDevlogs.map(devlog => (
						<DevlogCard
							key={devlog.filename}
							devlog={devlog}
							onClick={() => setSelectedDevlog(devlog)}
						/>
					))}
				</div>
			)}
			<DevlogDialog
				devlog={selectedDevlog}
				open={selectedDevlog !== null}
				onOpenChange={(open: boolean) => {
					if (!open) setSelectedDevlog(null);
				}}
			/>
		</div>
	);
}
