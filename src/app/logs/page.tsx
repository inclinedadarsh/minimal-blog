"use client";

import { useEffect, useState } from "react";
import DevlogDialog from "@/components/devlog-dialog";
import DevlogCard from "@/components/devlogs-card";
import type { DevlogEntry, DevlogIndexEntry } from "@/types/devlog";
import { GITHUB_RAW_BASE } from "@/types/devlog";

export default function LogsPage() {
	const [devlogs, setDevlogs] = useState<DevlogEntry[]>([]);
	const [selectedDevlog, setSelectedDevlog] = useState<DevlogEntry | null>(
		null,
	);

	useEffect(() => {
		fetch(`${GITHUB_RAW_BASE}/index.json`)
			.then(res => {
				if (!res.ok) return null;
				return res.json() as Promise<Record<string, DevlogIndexEntry>>;
			})
			.then(data => {
				if (!data) return;
				setDevlogs(
					Object.entries(data).map(([filename, meta], index) => ({
						...meta,
						filename,
						number: index + 1,
					})),
				);
			})
			.catch(() => setDevlogs([]));
	}, []);

	return (
		<div className="container mx-auto md:mt-5">
			<h1 className="text-3xl md:text-[40px] font-semibold font-serif mb-5 md:mb-10 text-foreground-title">
				Dev Logs
			</h1>
			{devlogs.length === 0 ? (
				<p className="text-foreground-body">No devlogs yet.</p>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{devlogs.map(devlog => (
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
