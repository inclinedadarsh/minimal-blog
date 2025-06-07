import { getAllBlogs, getAllTags, getBlogsByTag } from "@/lib/blogs";
import Link from "next/link";

export default async function AllBlogs({
	searchParams = {},
}: {
	searchParams?: { tag?: string };
}) {
	// Await the entire searchParams object
	const params = await Promise.resolve(searchParams);
	const tag = params?.tag;
	const blogs = tag ? await getBlogsByTag(tag) : await getAllBlogs();
	const allTags = await getAllTags();

	// Pre-compute tag styles to avoid await in JSX
	const tagStyles = allTags.map(t => ({
		tag: t,
		isActive: tag === t,
	}));

	return (
		<div className="space-y-8">
			{allTags.length > 0 && (
				<div className="flex flex-wrap gap-2">
					<Link
						href="/blog"
						className={`text-sm px-2 py-1 rounded-md transition-colors ${
							!tag
								? "bg-neutral-900 text-white dark:bg-white dark:text-black"
								: "bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700"
						}`}
					>
						All
					</Link>
					{tagStyles.map(({ tag: t, isActive }) => (
						<Link
							key={t}
							href={`/blog?tag=${t}`}
							className={`text-sm px-2 py-1 rounded-md transition-colors ${
								isActive
									? "bg-neutral-900 text-white dark:bg-white dark:text-black"
									: "bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700"
							}`}
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
