import { getAllBlogs } from "@/lib/blogs";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default async function TopBlogs() {
	const allBlogs = await getAllBlogs();
	const blogs = allBlogs.slice(0, 5);

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
