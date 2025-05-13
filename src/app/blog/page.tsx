import AllBlogs from "@/components/AllBlogs";

export default function BlogListPage() {
	return (
		<div className="md:mt-5">
			<h1 className="text-2xl font-bold font-title mb-5 md:mb-10 text-foreground">
				All Blogs
			</h1>
			<AllBlogs />
		</div>
	);
}
