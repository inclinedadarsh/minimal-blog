import { PROJECTS } from "@/constants";
import ProjectItem from "./ProjectItem";

const Projects = () => {
	return (
		<div className="mb-5 md:mb-10 grid gap-5 grid-cols-1 md:grid-cols-2">
			{PROJECTS.map(project => (
				<ProjectItem key={project.name} {...project} />
			))}
		</div>
	);
};

export default Projects;
