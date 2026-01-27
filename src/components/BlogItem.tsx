import Link from "next/link";
import type { BlogMetadata } from "@/lib/blogs";

const BlogItem = ({ blog }: { blog: BlogMetadata }) => {
	const d = new Date(blog.datePublished);

	const formatted = `${String(d.getDate()).padStart(2, "0")} ${d.toLocaleString(
		"en-US",
		{ month: "short" },
	)}, ${String(d.getFullYear()).slice(-2)}`;

	return (
		<Link
			key={blog.slug}
			className="flex items-baseline gap-4 mb-4 group hover:text-foreground/70 transition-colors"
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
