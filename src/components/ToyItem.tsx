import type { ProjectItemType } from "@/types";
import Technology from "./Technology";
import MinimalLink from "./ui/minimal-link";

const ToyItem = ({
	name,
	description,
	links,
	technologies,
	tags,
}: ProjectItemType) => {
	return (
		<div className="border-b border-border pb-6 md:pb-5 pt-6 md:pt-5 first:pt-0 last:border-b-0">
			<h3 className="text-xl font-medium text-foreground-title mb-2">
				{name}
			</h3>
			<div className="flex flex-wrap gap-2 mb-3">
				{tags?.map(tag => (
					<span
						key={tag}
						className="text-sm border border-border font-mono px-2 py-[3px]"
					>
						{tag}
					</span>
				))}
				{technologies?.map(tech => (
					<Technology key={tech} name={tech} />
				))}
			</div>
			<p className="text-foreground-body leading-relaxed mb-3">
				{description}
			</p>
			<div className="flex gap-4 shrink-0">
				{links.map(link => (
					<MinimalLink key={link.label} link={link} />
				))}
			</div>
		</div>
	);
};

export default ToyItem;
