import { Suspense } from "react";
import ToyProjectsClient from "@/components/ToyProjects";

export default async function ToysPage() {
	return (
		<main className="md:mt-5">
			<h1 className="text-3xl md:text-[40px] font-semibold font-serif mb-8 md:mb-12 text-foreground-title">
				Toy Projects
			</h1>
			<Suspense fallback={<div>Loading...</div>}>
				<ToyProjectsClient />
			</Suspense>
		</main>
	);
}
