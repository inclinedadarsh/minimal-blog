import Link from "next/link";
import { HEADER_LINKS } from "@/constants";
import MinimalLink from "./ui/minimal-link";

const Header = () => {
	return (
		<div>
			<div className="flex gap-3 items-end">
				<h1 className="text-3xl md:text-[40px] font-semibold font-serif">
					Adarsh Dubey
				</h1>
				<span className="hidden sm:block text-muted-foreground font-mono uppercase tracking-wider font-medium text-sm">
					{"{"}Full Stack AI Engineer{"}"}
				</span>
			</div>
			<div className="mt-6 text-foreground/80 flex gap-x-4 md:gap-6 flex-wrap">
				{HEADER_LINKS.map(link => (
					<MinimalLink key={link.label} link={link} />
				))}
			</div>
			<p className="mt-4 mb-5 md:mb-10 text-muted-foreground">
				I'm an AI engineer who loves building in public. I recently the{" "}
				<Link
					href="https://summerofcode.withgoogle.com/archive/2025/projects/6ep1Zcf2"
					target="_blank"
					rel="noopener noreferrer"
					className="underline underline-offset-2 decoration-muted-foreground/20 hover:no-underline hover:text-foreground transition-colors"
				>
					GSoC '25 program
				</Link>{" "}
				with Google DeepMind, and these days I'm exploring and
				researching the tangents of AI in my one-person lab called{" "}
				<Link
					href="https://tangentlab.xyz"
					target="_blank"
					rel="noopener noreferrer"
					className="underline underline-offset-2 decoration-muted-foreground/20 hover:no-underline hover:text-foreground transition-colors"
				>
					Tangent Lab
				</Link>
				, run by me and my AI agent{" "}
				<Link
					href="https://echo.adarshdubey.com"
					target="_blank"
					rel="noopener noreferrer"
					className="underline underline-offset-2 decoration-muted-foreground/20 hover:no-underline hover:text-foreground transition-colors"
				>
					Echo
				</Link>
				. I speak at local tech meetups, write technical blogs, and when
				I'm not lost in code, I'm probably playing badminton or enjoying
				misal pav.
			</p>
		</div>
	);
};

export default Header;
