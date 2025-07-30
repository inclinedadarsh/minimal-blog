import { getAllBlogs } from "@/lib/blogs";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import BlogItem from "./BlogItem";

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
					<BlogItem key={blog.slug} blog={blog} />
				))}
			</div>
		</div>
	);
}
