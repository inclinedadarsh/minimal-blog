import { HEADER_LINKS } from "@/constants";
import MinimalLink from "./ui/minimal-link";

const Header = () => {
	return (
		<div>
			<h1 className="text-3xl font-bold">Adarsh Dubey</h1>
			<div className="mt-2 text-foreground/80 flex gap-x-4 md:gap-6 flex-wrap">
				{HEADER_LINKS.map(link => (
					<MinimalLink key={link.label} link={link} />
				))}
			</div>
			<p className="mt-4 mb-5 md:mb-10 text-muted-foreground">
				I'm a web developer and machine learning engineer who loves
				building in public. Currently contributing to Google DeepMind
				through GSoC '25, and lately, I've been tinkering with LLMs. I
				speak at local tech meetups, write technical blogs, and when I'm
				not lost in code, I'm probably enjoying misal pav.
			</p>
		</div>
	);
};

export default Header;
