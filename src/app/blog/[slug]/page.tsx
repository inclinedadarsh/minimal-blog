import { getBlogBySlug } from "@/lib/blogs";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";

interface BlogPageProps {
	params: Promise<{
		slug: string;
	}>;
}

export async function generateMetadata({
	params,
}: BlogPageProps): Promise<Metadata> {
	const { slug } = await params;
	const blog = await getBlogBySlug(slug);

	return {
		title: blog.seoTitle || blog.title,
		description: blog.seoDescription || "",
	};
}

export default async function BlogPage({ params }: BlogPageProps) {
	const { slug } = await params;
	const blog = await getBlogBySlug(slug);

	return (
		<article className="prose">
			<h1>{blog.title}</h1>
			<time dateTime={blog.datePublished}>
				{new Date(blog.datePublished).toLocaleDateString("en-US", {
					year: "numeric",
					month: "long",
					day: "numeric",
				})}
			</time>
			<div className="mt-4">
				<MDXRemote source={blog.content} />
			</div>
		</article>
	);
}
