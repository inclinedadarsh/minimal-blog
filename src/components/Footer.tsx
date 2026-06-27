import Link from "next/link";
import { FOOTER_LINKS } from "@/constants";
import MinimalLink from "./ui/minimal-link";

const Footer = () => {
	return (
		<footer
			id="footer"
			className="mt-10 md:mt-16 py-8 border-t border-border flex flex-col md:flex-row md:items-center justify-between gap-4"
		>
			<Link
				href="mailto:dubeyadarshmain@gmail.com"
				className="text-foreground-title px-2 py-1 border border-border rounded-sm leading-[150%] hover:border-foreground-body/40 transition-colors w-fit"
			>
				Let's talk?
			</Link>
			<div className="flex gap-x-4 md:gap-6">
				{FOOTER_LINKS.map(link => (
					<MinimalLink key={link.label} link={link} />
				))}
			</div>
		</footer>
	);
};

export default Footer;
