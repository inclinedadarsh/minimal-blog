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
		<div>
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-1 md:gap-2">
				<h3 className="text-lg font-bold">{name}</h3>
				<div className="flex gap-4">
					{links.map(link => (
						<MinimalLink key={link.label} link={link} />
					))}
				</div>
			</div>
			<p className="mb-2 mt-2 text-muted-foreground">{description}</p>
			<div className="flex flex-wrap gap-2">
				{technologies?.map(technology => (
					<Technology key={technology} name={technology} />
				))}
			</div>
		</div>
	);
};

export default ProjectItem;
