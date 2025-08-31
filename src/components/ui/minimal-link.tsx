import type { LinkType } from "@/types";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const MinimalLink = ({ link }: { link: LinkType }) => {
	return (
		<Link
			href={link.href}
			target={link.openInNewTab ? "_blank" : ""}
			rel={link.openInNewTab ? "noopener noreferrer" : ""}
			className="flex gap-1 items-center hover:text-foreground/60 transition-colors hover:cursor-pointer group"
		>
			<ArrowUpRight
				size={16}
				className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
			/>
			{link.label}
		</Link>
	);
};

export default MinimalLink;
