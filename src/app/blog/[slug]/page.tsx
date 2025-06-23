import { getAllBlogs, getBlogBySlug } from "@/lib/blogs";
import { compileMDXWithOptions } from "@/lib/mdx";
import type { Metadata } from "next";
import Link from "next/link";

export async function generateStaticParams() {
	const blogs = await getAllBlogs();
	return blogs.map(blog => ({
		slug: blog.slug,
	}));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const blog = await getBlogBySlug(slug);

	return {
		title: blog.seoTitle || blog.title,
		description: blog.seoDescription || "",
	};
}

export default async function BlogPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const blog = await getBlogBySlug(slug);
	const { content } = await compileMDXWithOptions(blog.content);

	return (
		<article className="prose prose-neutral dark:prose-invert max-w-none mt-5">
			<h1 className="text-2xl font-bold">{blog.title}</h1>
			<time
				dateTime={blog.datePublished}
				className="text-neutral-600 dark:text-neutral-400"
			>
				{new Date(blog.datePublished).toLocaleDateString("en-US", {
					year: "numeric",
					month: "long",
					day: "numeric",
				})}
			</time>
			{blog.tags.length > 0 && (
				<div className="flex gap-2 mt-3 tags">
					{blog.tags.map((tag: string) => (
						<Link
							key={tag}
							href={`/blog?tag=${tag}`}
							className="text-sm px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
						>
							{tag}
						</Link>
					))}
				</div>
			)}
			<hr className="my-6 border-neutral-200 dark:border-neutral-800" />
			<div className="mt-8">{content}</div>
		</article>
	);
}
