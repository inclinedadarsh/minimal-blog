import { PROJECTS } from "@/constants";
import ProjectItem from "./ProjectItem";

const Projects = () => {
	return (
		<div className="mb-5 md:mb-10 flex flex-col gap-5">
			<div className="flex flex-col gap-5">
				{PROJECTS.map(project => (
					<ProjectItem key={project.name} {...project} />
				))}
			</div>
		</div>
	);
};

export default Projects;
