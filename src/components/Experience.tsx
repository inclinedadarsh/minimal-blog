import { deepmindLogo, wemakedevsLogo } from "@/assets";
import type { ExperienceItemType } from "@/types";
import ExperienceItem from "./ExperienceItem";

const experienceItems: ExperienceItemType[] = [
	{
		companyName: "Google DeepMind",
		companyLogo: deepmindLogo,
		workTitle: "GSoC '25 contributor",
		workDuration: "May 2025 — Aug 2025",
		compnayWebsite: "https://deepmind.google",
	},
	{
		companyName: "WeMakeDevs",
		companyLogo: wemakedevsLogo,
		workTitle: "Web developer & core team member",
		workDuration: "2023 — Present",
		compnayWebsite: "https://wemakedevs.org",
	},
];

const Experience = () => {
	return (
		<div className="mb-5 md:mb-10 space-y-3">
			<h2 className="text-2xl font-bold">Career highlights</h2>
			<div className="">
				{experienceItems.map(item => (
					<ExperienceItem key={item.companyName} {...item} />
				))}
			</div>
		</div>
	);
};

export default Experience;
