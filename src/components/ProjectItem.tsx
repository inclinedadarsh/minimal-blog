import type { ProjectItemType } from "@/types";
import Technology from "./Technology";
import MinimalLink from "./ui/minimal-link";

const ProjectItem = ({
	name,
	description,
	links,
	technologies,
}: ProjectItemType) => {
	return (
		<div className="border border-border rounded-sm p-5 hover:border-foreground-body/40 transition-colors h-fit">
			<div className="">
				<h3 className="text-xl font-medium text-foreground-title mb-3">
					{name}
				</h3>
			</div>
			<p className="text-foreground-body leading-relaxed mb-4">
				{description}
			</p>
			<div className="flex flex-wrap gap-2 mb-4">
				{technologies?.map(technology => (
					<Technology key={technology} name={technology} />
				))}
			</div>
			<div className="flex gap-4 shrink-0">
				{links.map(link => (
					<MinimalLink key={link.label} link={link} />
				))}
			</div>
		</div>
	);
};

export default ProjectItem;
