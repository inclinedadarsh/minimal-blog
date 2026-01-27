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
			className="flex flex-col md:flex-row items-baseline gap-1 md:gap-4 group hover:text-foreground/70 transition-colors"
			href={`/blog/${blog.slug}`}
		>
			<time
				dateTime={blog.datePublished}
				className="text-muted-foreground font-mono uppercase tracking-wider font-medium text-sm min-w-fit relative -top-px"
			>
				{formatted}
			</time>
			<h3 className="text-foreground group-hover:text-foreground/70 transition-colors font-medium text-pretty">
				{blog.title}
			</h3>
		</Link>
	);
};

export default BlogItem;
