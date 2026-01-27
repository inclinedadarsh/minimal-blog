import { getAllBlogs } from "@/lib/blogs";
import BlogItem from "./BlogItem";
import MinimalLink from "./ui/minimal-link";

export default async function TopBlogs() {
	const allBlogs = await getAllBlogs();
	const blogs = allBlogs.slice(0, 5);

	return (
		<div className="mb-5 md:mb-10">
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-2xl font-bold">Recent blogs</h2>
				<MinimalLink link={{ label: "all blogs", href: "/blog" }} />
			</div>
			<div className="space-y-6 md:space-y-4">
				{blogs.map(blog => (
					<BlogItem key={blog.slug} blog={blog} />
				))}
			</div>
		</div>
	);
}
