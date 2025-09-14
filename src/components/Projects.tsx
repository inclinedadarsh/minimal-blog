import { PROJECTS } from "@/constants";
import ProjectItem from "./ProjectItem";

const Projects = () => {
	return (
		<div className="mb-5 md:mb-10 space-y-5">
			<div className="space-y-8">
				{PROJECTS.map(project => (
					<ProjectItem key={project.name} {...project} />
				))}
			</div>
		</div>
	);
};

export default Projects;
