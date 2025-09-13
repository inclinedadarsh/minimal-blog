import { cn } from "@/lib/utils";
import { CircleCheck, CircleDot, GitMerge, GitPullRequest } from "lucide-react";
import Link from "next/link";

const GHLinkIcon = ({
	type,
	status,
}: { type: "issue" | "pr"; status: "open" | "closed" }) => {
	if (type === "issue") {
		if (status === "open") {
			return <CircleDot className="text-gh-open" size={18} />;
			// biome-ignore lint/style/noUselessElse: <explanation>
		} else {
			return <CircleCheck className="text-gh-closed" size={18} />;
		}
		// biome-ignore lint/style/noUselessElse: <explanation>
	} else {
		if (status === "open") {
			return <GitPullRequest className="text-gh-open" size={18} />;
			// biome-ignore lint/style/noUselessElse: <explanation>
		} else {
			return <GitMerge className="text-gh-closed" size={18} />;
		}
	}
};

const GHLink = ({
	title,
	link,
	status,
	type,
}: {
	title: string;
	link: string;
	status: "open" | "closed";
	type: "issue" | "pr";
}) => {
	// Extract the issue number from the link, handling possible trailing slashes
	const issueNumber = link.replace(/\/+$/, "").split("/").pop();

	return (
		<Link
			target="_blank"
			rel="noopener noreferrer"
			href={link}
			className={cn(
				"issue flex items-center gap-1.5 border border-border rounded-full  py-1 w-fit hover:bg-accent/50 transition-colors",
				type === "issue" && "pl-1.5 pr-2.5",
				type === "pr" && "px-2.5",
			)}
		>
			<GHLinkIcon type={type} status={status} />
			<span className="">{title}</span>
			<span className="text-muted-foreground text-sm">
				#{issueNumber}
			</span>
		</Link>
	);
};

export default GHLink;
