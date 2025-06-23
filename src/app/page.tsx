import AllBlogs from "@/components/AllBlogs";
import Experience from "@/components/Experience";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

type LinkType = {
	label: string;
	href: string;
};

const links: LinkType[] = [
	{
		label: "twitter",
		href: "https://x.com/inclinedadarsh",
	},
	{
		label: "github",
		href: "https://github.com/inclinedadarsh",
	},
	{
		label: "linkedin",
		href: "https://linkedin.com/in/dubeyadarsh/",
	},
	{
		label: "newsletter",
		href: "https://theneuron.substack.com/",
	},
	{
		label: "youtube",
		href: "https://www.youtube.com/@inclinedadarsh",
	},
];

export default function Home() {
	return (
		<main className="md:mt-5">
			<h1 className="text-2xl font-bold">Adarsh Dubey</h1>
			<div className="mt-2 text-foreground/80 flex gap-x-4 md:gap-6 flex-wrap">
				{links.map(link => (
					<Link
						key={link.label}
						href={link.href}
						target="_blank"
						rel="noopener noreferrer"
						className="flex gap-1 items-center hover:text-foreground/60 transition-colors hover:cursor-pointer"
					>
						<ArrowUpRight size={16} />
						{link.label}
					</Link>
				))}
			</div>
			<p className="mt-4 text-foreground/80 dark:text-white mb-5 md:mb-10">
				I'm a web developer and machine learning enthusiast who loves
				building in public. Currently contributing to Google DeepMind
				through GSoC '25, and lately, I've been tinkering with LLMs. I
				speak at local tech meetups, write technical and non-technical
				blogs, and when I'm not lost in code, I'm probably enjoying
				misal pav.
			</p>
			<Experience />
			<AllBlogs />
		</main>
	);
}
