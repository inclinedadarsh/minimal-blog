import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { getAllBlogs, getBlogBySlug } from "@/lib/blogs";
import { compileMDXWithOptions } from "@/lib/mdx";
import { generateRSS } from "@/lib/rss";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
	const blogs = await getAllBlogs();

	// Build the RSS feed
	await generateRSS(blogs);

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
		<div className="">
			<article className="prose prose-neutral dark:prose-invert max-w-none mt-5">
				<h1 className="text-3xl font-bold">{blog.title}</h1>
				<time
					dateTime={blog.datePublished}
					className="text-muted-foreground font-mono uppercase tracking-wider font-medium mt-3 block text-sm"
				>
					{new Date(blog.datePublished).toLocaleDateString("en-US", {
						year: "numeric",
						month: "long",
						day: "numeric",
					})}
				</time>
				{blog.tags.length > 0 && (
					<div className="flex gap-2 mt-4 tags">
						{blog.tags.map((tag: string) => (
							<Link
								key={tag}
								href={`/blog?tag=${tag}`}
								className="text-sm px-2 py-1 bg-muted/0 outline-2 outline-muted dark:bg-neutral-800 dark:outline-neutral-800 rounded-md hover:bg-muted dark:hover:bg-neutral-700 transition-colors"
							>
								{tag}
							</Link>
						))}
					</div>
				)}
				<hr className="my-6 border-neutral-200 dark:border-neutral-800" />
				{blog.notebookLM && (
					<div className="p-4 border border-border rounded-md space-y-2">
						<p className="font-medium">
							Don't feel like reading? Hit play and enjoy this
							blog in a podcast-style audio.
						</p>
						<Link
							href={blog.notebookLM}
							className={cn(
								buttonVariants({
									variant: "outline",
								}),
							)}
							target="_blank"
							rel="noopener noreferrer"
						>
							Listen on NotebookLM <ArrowUpRight />
						</Link>
					</div>
				)}
				<div className="mt-6">{content}</div>
				<hr className="my-6 border-neutral-200 dark:border-neutral-800" />
			</article>
		</div>
	);
}
