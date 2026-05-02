import { notFound } from "next/navigation";
import { getAllBlogs, getBlogBySlug } from "@/lib/blogs";

export async function generateStaticParams() {
	const blogs = await getAllBlogs();

	return blogs.map(blog => ({
		slug: blog.slug,
	}));
}

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ slug: string }> },
) {
	const { slug } = await params;
	const blog = await getBlogBySlug(slug);

	if (!blog) {
		notFound();
	}

	const dateString = new Date(blog.datePublished).toLocaleDateString(
		"en-US",
		{
			year: "numeric",
			month: "long",
			day: "numeric",
		},
	);

	const textContent = `# ${blog.title}\n\nPublished: ${dateString}\n\n${blog.content}`;

	return new Response(textContent, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
}
