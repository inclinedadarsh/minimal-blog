"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { BlogMetadata } from "@/lib/blogs";
import { cn } from "@/lib/utils";
import BlogItem from "./BlogItem";

export default function AllBlogsClient({
	allBlogs,
	tags,
}: {
	allBlogs: BlogMetadata[];
	tags: string[];
}) {
	const searchParams = useSearchParams();
	const [selectedTag, setSelectedTag] = useState<string | undefined>(
		undefined,
	);

	// Read the tag from URL on component mount
	useEffect(() => {
		const tagFromUrl = searchParams.get("tag");
		if (tagFromUrl) {
			setSelectedTag(tagFromUrl);
		}
	}, [searchParams]);

	const blogs = useMemo(() => {
		if (!selectedTag) return allBlogs;
		return allBlogs.filter(blog => blog.tags.includes(selectedTag));
	}, [allBlogs, selectedTag]);

	return (
		<div className="space-y-8">
			{tags.length > 0 && (
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
					{tags.map(t => (
						<button
							type="button"
							key={t}
							onClick={() => setSelectedTag(t)}
							className={cn(
								"text-sm px-2 py-[3px] transition-colors font-mono border",
								selectedTag === t &&
									"bg-foreground-title/90 text-background",
								selectedTag !== t &&
									"bg-background text-foreground-title",
							)}
						>
							{t}
						</button>
					))}
				</div>
			)}
			<div className="space-y-6 md:space-y-4">
				{blogs.map(blog => (
					<BlogItem key={blog.slug} blog={blog} />
				))}
			</div>
		</div>
	);
}
