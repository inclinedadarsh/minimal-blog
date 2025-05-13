import AllBlogs from "@/components/AllBlogs";
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
];

export default function Home() {
	return (
		<main className="md:mt-5">
			<h1 className="text-2xl font-bold font-title">Adarsh Dubey</h1>
			<div className="mt-2 text-foreground/80 flex gap-4">
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
			<p className="mt-4 text-foreground/80 mb-5 md:mb-10">
				I'm a Vim enthusiast and tab advocate, finding unmatched
				efficiency in Vim's keystroke commands and tabs' flexibility for
				personal viewing preferences. This extends to my support for
				static typing, where its early error detection ensures cleaner
				code, and my preference for dark mode, which eases long coding
				sessions by reducing eye strain.
			</p>
			<AllBlogs />
		</main>
	);
}
