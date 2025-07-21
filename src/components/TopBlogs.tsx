"use client";
import type { BlogMetadata } from "@/lib/blogs";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function TopBlogsClient({
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
		const filtered = selectedTag
			? allBlogs.filter(blog => blog.tags.includes(selectedTag))
			: allBlogs;
		return filtered.slice(0, 5);
	}, [allBlogs, selectedTag]);

	return (
		<div className="mb-5 md:mb-10">
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-2xl font-bold">Recent blogs</h2>
				<Link
					href="/blog"
					className="flex gap-1 items-center text-foreground/80 hover:text-foreground/60 transition-colors hover:cursor-pointer"
				>
					<ArrowUpRight size={16} /> all blogs
				</Link>
			</div>
			{tags.length > 0 && (
				<div className="flex flex-wrap gap-2 mb-4">
					<button
						type="button"
						onClick={() => setSelectedTag(undefined)}
						className="text-sm px-2 py-1 rounded-md transition-colors bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700"
					>
						All
					</button>
					{tags.map(t => (
						<button
							type="button"
							key={t}
							onClick={() => setSelectedTag(t)}
							className="text-sm px-2 py-1 rounded-md transition-colors bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700"
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
