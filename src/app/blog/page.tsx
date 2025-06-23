import AllBlogs from "@/components/AllBlogs";

export default async function BlogPage({
	searchParams,
}: {
	searchParams: Promise<{ tag?: string }>;
}) {
	const params = await searchParams;
	return (
		<div className="container mx-auto md:mt-5">
			<h1 className="text-3xl font-bold mb-5 md:mb-10">Blogs</h1>
			<AllBlogs searchParams={params} />
		</div>
	);
}
