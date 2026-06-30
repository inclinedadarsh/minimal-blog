"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { TOY_PROJECTS } from "@/constants";
import { cn } from "@/lib/utils";
import ToyItem from "./ToyItem";

export default function ToyProjectsClient() {
	const searchParams = useSearchParams();
	const [selectedTag, setSelectedTag] = useState<string | undefined>(
		undefined,
	);

	useEffect(() => {
		const tagFromUrl = searchParams.get("tag");
		if (tagFromUrl) {
			setSelectedTag(tagFromUrl);
		}
	}, [searchParams]);

	const allTags = useMemo(() => {
		const tagSet = new Set<string>();
		for (const p of TOY_PROJECTS) {
			for (const t of p.tags ?? []) {
				tagSet.add(t);
			}
		}
		return Array.from(tagSet).sort();
	}, []);

	const filteredProjects = useMemo(() => {
		if (!selectedTag) return TOY_PROJECTS;
		return TOY_PROJECTS.filter(p => p.tags?.includes(selectedTag));
	}, [selectedTag]);

	return (
		<div className="space-y-6 md:space-y-5 mb-5 md:mb-10">
			{allTags.length > 0 && (
				<div className="flex flex-wrap gap-2">
					<button
						type="button"
						onClick={() => setSelectedTag(undefined)}
						className={cn(
							"text-sm px-2 py-[3px] transition-colors font-mono border",
							!selectedTag &&
								"bg-foreground-title/90 text-background",
							selectedTag &&
								"bg-background text-foreground-title",
						)}
					>
						All
					</button>
					{allTags.map(tag => (
						<button
							key={tag}
							type="button"
							onClick={() => setSelectedTag(tag)}
							className={cn(
								"text-sm px-2 py-[3px] transition-colors font-mono border",
								selectedTag === tag &&
									"bg-foreground-title/90 text-background",
								selectedTag !== tag &&
									"bg-background text-foreground-title",
							)}
						>
							{tag}
						</button>
					))}
				</div>
			)}
			<div>
				{filteredProjects.map(project => (
					<ToyItem key={project.name} {...project} />
				))}
			</div>
		</div>
	);
}
