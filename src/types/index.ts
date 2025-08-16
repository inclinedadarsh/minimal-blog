import type { StaticImageData } from "next/image";

export type ExperienceItemType = {
	companyName: string;
	companyLogo: StaticImageData;
	workTitle: string;
	workDuration: string;
	compnayWebsite: string;
};

export type TechnologyItemType = {
	name: string;
	logo: StaticImageData;
};
