import type { BlogMetadata } from "@/lib/blogs";
import Link from "next/link";
import React from "react";

const BlogItem = ({ blog }: { blog: BlogMetadata }) => {
	return (
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
					{new Date(blog.datePublished).toLocaleDateString("en-US", {
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
	);
};

export default BlogItem;
