import Projects from "@/components/Projects";
import Technologies from "@/components/Technologies";

export default async function ProjectsPage() {
	return (
		<main className="md:mt-5">
			<h1 className="text-3xl md:text-[40px] font-semibold font-serif mb-8 md:mb-12 text-foreground-title">
				Projects
			</h1>
			<Projects />
			<Technologies />
		</main>
	);
}
