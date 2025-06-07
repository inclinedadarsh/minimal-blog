import AllBlogs from "@/components/AllBlogs";

export default async function BlogPage({
	searchParams,
}: {
	searchParams: Promise<{ tag?: string }>;
}) {
	const params = await searchParams;
	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-8">Blog</h1>
			<AllBlogs searchParams={params} />
		</div>
	);
}
