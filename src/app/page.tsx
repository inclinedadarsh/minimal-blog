import Experience from "@/components/Experience";
import Header from "@/components/Header";
import Subscribe from "@/components/Subscribe";
import TopBlogs from "@/components/TopBlogs";

export default async function Home() {
	return (
		<main className="md:mt-5">
			<Header />
			<Experience />
			<TopBlogs />
			<Subscribe slug="home" page="Home" />
		</main>
	);
}
