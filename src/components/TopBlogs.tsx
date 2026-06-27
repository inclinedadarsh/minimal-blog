import { getAllBlogs } from "@/lib/blogs";
import BlogItem from "./BlogItem";
import MinimalLink from "./ui/minimal-link";

export default async function TopBlogs() {
	const allBlogs = await getAllBlogs();
	const blogs = allBlogs.slice(0, 5);

	return (
		<div className="mb-5 md:mb-10">
			<div className="flex items-center gap-6 mb-6">
				<h2 className="text-xl font-mono uppercase text-foreground-title shrink-0">
					Blog Posts
				</h2>
				<div className="w-full h-[1px] bg-border" />
				<MinimalLink
					link={{ label: "all blogs", href: "/blogs" }}
					className="shrink-0"
				/>
			</div>
			<div className="space-y-6 md:space-y-4">
				{blogs.map(blog => (
					<BlogItem key={blog.slug} blog={blog} />
				))}
			</div>
		</div>
	);
}
