import AllBlogsClient from "@/components/AllBlogs";
import { getAllBlogs, getAllTags } from "@/lib/blogs";

export default async function BlogPage() {
	const allBlogs = await getAllBlogs();
	const tags = await getAllTags();
	return (
		<div className="container mx-auto md:mt-5">
			<h1 className="text-3xl font-bold mb-5 md:mb-10">Blogs</h1>
			<AllBlogsClient allBlogs={allBlogs} tags={tags} />
		</div>
	);
}
