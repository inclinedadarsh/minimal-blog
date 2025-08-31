import Experience from "@/components/Experience";
import Header from "@/components/Header";
import Projects from "@/components/Projects";
import Subscribe from "@/components/Subscribe";
import Technologies from "@/components/Technologies";
import TopBlogs from "@/components/TopBlogs";

export default async function Home() {
	return (
		<main className="md:mt-5">
			<Header />
			<Experience />
			<Projects />
			<TopBlogs />
			<Technologies />
			<Subscribe slug="home" page="Home" />
		</main>
	);
}
