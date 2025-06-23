import { getAllBlogs, getAllTags, getBlogsByTag } from "@/lib/blogs";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default async function TopBlogs({
	searchParams = {},
}: { searchParams?: { tag?: string } }) {
	const params = await Promise.resolve(searchParams);
	const tag = params?.tag;
	const blogs = tag
		? (await getBlogsByTag(tag)).slice(0, 5)
		: (await getAllBlogs()).slice(0, 5);
	const allTags = await getAllTags();

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
			{allTags.length > 0 && (
				<div className="flex flex-wrap gap-2 mb-4">
					<Link
						href="/blog"
						className="text-sm px-2 py-1 rounded-md transition-colors bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700"
					>
						All
					</Link>
					{allTags.map(t => (
						<Link
							key={t}
							href={`/blog?tag=${t}`}
							className="text-sm px-2 py-1 rounded-md transition-colors bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700"
						>
							{t}
						</Link>
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
