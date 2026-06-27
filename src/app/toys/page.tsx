import ToyProjects from "@/components/ToyProjects";

export default async function ToysPage() {
	return (
		<main className="md:mt-5">
			<h1 className="text-3xl md:text-[40px] font-semibold font-serif mb-8 md:mb-12 text-foreground-title">
				Toy Projects
			</h1>
			<ToyProjects />
		</main>
	);
}
