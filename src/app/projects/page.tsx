import Projects from "@/components/Projects";
import Technologies from "@/components/Technologies";

export default async function ProjectsPage() {
	return (
		<main className="md:mt-5">
			<h1 className="text-3xl font-bold mb-5 md:mb-10">Projects</h1>
			<Projects />
			<Technologies />
		</main>
	);
}
