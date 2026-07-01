"use client";

import { Suspense, useState } from "react";
import Projects from "@/components/Projects";
import Technologies from "@/components/Technologies";
import ToyProjectsClient from "@/components/ToyProjects";
import { cn } from "@/lib/utils";

type Tab = "portfolio" | "experiments";

export default function ProjectsPage() {
	const [activeTab, setActiveTab] = useState<Tab>("portfolio");

	return (
		<main className="md:mt-5">
			<h1 className="text-3xl md:text-[40px] font-semibold font-serif mb-8 md:mb-12 text-foreground-title">
				Projects
			</h1>
			<div className="flex gap-2 mb-8">
				<button
					type="button"
					onClick={() => setActiveTab("portfolio")}
					className={cn(
						"text-sm px-3 py-[5px] transition-colors font-mono border",
						activeTab === "portfolio"
							? "bg-foreground-title/90 text-background"
							: "bg-background text-foreground-title",
					)}
				>
					Portfolio
				</button>
				<button
					type="button"
					onClick={() => setActiveTab("experiments")}
					className={cn(
						"text-sm px-3 py-[5px] transition-colors font-mono border",
						activeTab === "experiments"
							? "bg-foreground-title/90 text-background"
							: "bg-background text-foreground-title",
					)}
				>
					Experiments
				</button>
			</div>
			{activeTab === "portfolio" ? (
				<Projects />
			) : (
				<Suspense fallback={<div>Loading...</div>}>
					<ToyProjectsClient />
				</Suspense>
			)}
			<Technologies />
		</main>
	);
}
