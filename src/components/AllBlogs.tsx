"use client";
import type { BlogMetadata } from "@/lib/blogs";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function AllBlogsClient({
	allBlogs,
	tags,
	initialTag = undefined,
}: {
	allBlogs: BlogMetadata[];
	tags: string[];
	initialTag?: string;
}) {
	const [selectedTag, setSelectedTag] = useState<string | undefined>(
		initialTag,
	);

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
			<div className="space-y-4">
				{blogs.map(blog => (
					<Link
						key={blog.slug}
						className="flex flex-col space-y-1 mb-4 hover:text-foreground/70 transition-colors"
						href={`/blog/${blog.slug}`}
					>
						<div className="w-full hover:text-foreground/70 transition-colors flex flex-col md:flex-row gap-0 md:gap-2">
							<time
								dateTime={blog.datePublished}
								className="text-muted-foreground min-w-[120px]"
							>
								{new Date(
									blog.datePublished,
								).toLocaleDateString("en-US", {
									year: "numeric",
									month: "short",
									day: "numeric",
								})}
							</time>
							<h3 className="text-foreground hover:text-foreground/70 transition-colors font-medium">
								{blog.title}
							</h3>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
