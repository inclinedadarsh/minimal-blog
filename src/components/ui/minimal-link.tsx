import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { LinkType } from "@/types";

const MinimalLink = ({
	link,
	className,
}: {
	link: LinkType;
	className?: React.ComponentProps<"a">["className"];
}) => {
	return (
		<Link
			href={link.href}
			target={link.openInNewTab ? "_blank" : ""}
			rel={link.openInNewTab ? "noopener noreferrer" : ""}
			className={cn(
				"flex gap-1 items-center text-foreground-body hover:text-foreground-title transition-colors hover:cursor-pointer group",
				className,
			)}
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
