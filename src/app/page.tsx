import Experience from "@/components/Experience";
import Header from "@/components/Header";
import TopBlogs from "@/components/TopBlogs";

export default async function Home() {
	return (
		<main className="md:mt-5">
			<Header />
			<Experience />
			<TopBlogs />
		</main>
	);
}
