"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { BlogMetadata } from "@/lib/blogs";
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
						className={`text-sm px-2 py-1 rounded-md transition-colors ${
							!selectedTag
								? "bg-neutral-900 text-white dark:bg-white dark:text-black"
								: "bg-muted/0 outline-2 outline-muted dark:bg-neutral-800 dark:outline-neutral-800 hover:bg-muted dark:hover:bg-neutral-700"
						}`}
					>
						All
					</button>
					{tags.map(t => (
						<button
							type="button"
							key={t}
							onClick={() => setSelectedTag(t)}
							className={`text-sm px-2 py-1 rounded-md transition-colors ${
								selectedTag === t
									? "bg-neutral-900 text-white dark:bg-white dark:text-black"
									: "bg-muted/0 outline-2 outline-muted dark:bg-neutral-800 dark:outline-neutral-800 hover:bg-muted dark:hover:bg-neutral-700"
							}`}
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
