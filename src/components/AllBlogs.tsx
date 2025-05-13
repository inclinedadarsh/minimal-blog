import { getAllBlogs } from "@/lib/blogs";
import Link from "next/link";

export default async function AllBlogs() {
	const blogs = await getAllBlogs();

	return (
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
							{new Date(blog.datePublished).toLocaleDateString(
								"en-US",
								{
									year: "numeric",
									month: "short",
									day: "numeric",
								},
							)}
						</time>
						<h3 className="text-foreground hover:text-foreground/70 transition-colors font-medium">
							{blog.title}
						</h3>
					</div>
				</Link>
			))}
		</div>
	);
}
