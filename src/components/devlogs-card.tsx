"use client";

import type { DevlogEntry } from "@/types/devlog";

export default function DevlogCard({
	devlog,
	onClick,
}: {
	devlog: DevlogEntry;
	onClick: () => void;
}) {
	return (
		<button
			onClick={onClick}
			type="button"
			tabIndex={0}
			onKeyDown={e => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					onClick();
				}
			}}
			className="text-left p-4 border-border border cursor-pointer hover:bg-zinc-900/40"
		>
			<div>
				<div className="flex gap-4 items-center justify-between font-mono">
					<time dateTime={devlog.date} className="">
						{new Date(devlog.date).toLocaleDateString("en-US", {
							year: "numeric",
							month: "short",
							day: "numeric",
						})}
					</time>
					<span className="text-foreground-title">
						#{devlog.number}
					</span>
				</div>
				<h3 className="text-foreground-title text-xl font-medium mt-1">
					{devlog.title}
				</h3>
				<p className="mt-4">{devlog.description}</p>
			</div>
		</button>
	);
}
