import Link from "next/link";
import type { BlogMetadata } from "@/lib/blogs";

const BlogItem = ({ blog }: { blog: BlogMetadata }) => {
	const d = new Date(blog.datePublished);

	const formatted = `${d.toLocaleString("en-US", {
		month: "short",
	})} ${String(d.getDate()).padStart(2, "0")}`;

	return (
		<Link
			key={blog.slug}
			className="flex flex-col md:flex-row items-baseline gap-1 md:gap-4 group hover:text-foreground-body transition-colors"
			href={`/blogs/${blog.slug}`}
		>
			<h3 className="text-foreground-title group-hover:text-foreground-body transition-colors font-medium text-pretty grow">
				{blog.title}
			</h3>
			<time
				dateTime={blog.datePublished}
				className="text-foreground-body font-mono uppercase tracking-wider font-medium text-sm min-w-fit relative -top-px"
			>
				{formatted}
			</time>
		</Link>
	);
};

export default BlogItem;
