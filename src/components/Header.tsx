import Link from "next/link";
import { HEADER_LINKS } from "@/constants";
import MinimalLink from "./ui/minimal-link";

const Header = () => {
	return (
		<div>
			<div className="flex gap-3 items-end">
				<h1 className="text-3xl md:text-[40px] font-semibold font-serif text-foreground-title">
					Adarsh Dubey
				</h1>
				<span className="hidden sm:block text-foreground-body font-mono uppercase tracking-wider font-medium text-sm">
					{"{"}Full Stack AI Engineer{"}"}
				</span>
			</div>
			<div className="mt-8 flex gap-x-4 md:gap-6 flex-wrap">
				{HEADER_LINKS.map(link => (
					<MinimalLink key={link.label} link={link} />
				))}
			</div>
			<p className="mt-2 mb-10 md:mb-20 text-foreground-body leading-[165%] max-w-2xl">
				AI full stack engineer who loves building end-to-end products. I
				recently completed the{" "}
				<span className="text-foreground-title">
					<Link
						href="https://summerofcode.withgoogle.com/archive/2025/projects/6ep1Zcf2"
						target="_blank"
						rel="noopener noreferrer"
						className="underline underline-offset-2 decoration-muted-foreground/20 hover:no-underline hover:text-foreground-body transition-colors"
					>
						GSoC '25 program
					</Link>{" "}
					with Google DeepMind
				</span>
				, and these days I'm{" "}
				<span className="text-foreground-title">
					exploring the tangents of AI from{" "}
					<Link
						href="https://tangentlab.xyz"
						target="_blank"
						rel="noopener noreferrer"
						className="underline underline-offset-2 decoration-muted-foreground/20 hover:no-underline hover:text-foreground-body transition-colors"
					>
						Tangent Lab
					</Link>
				</span>
				. I speak at tech meetups, write blogs, and when I'm not lost in
				code, I'm probably playing badminton or enjoying misal pav.
			</p>
		</div>
	);
};

export default Header;
