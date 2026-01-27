import type { StaticImageData } from "next/image";
import type { TECHNOLOGIES } from "@/constants";

export type ExperienceItemType = {
	companyName: string;
	companyLogo: StaticImageData;
	workTitle: string;
	workDuration: string;
	compnayWebsite: string;
};

export type TechnologyType = {
	name: string;
	logo: StaticImageData;
};

export type TechnologyNameType = keyof typeof TECHNOLOGIES;

export type LinkType = {
	label: string;
	href: string;
	openInNewTab?: boolean;
};

export type ProjectItemType = {
	name: string;
	description: string;
	links: LinkType[];
	technologies?: TechnologyNameType[];
};
