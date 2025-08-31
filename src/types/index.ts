import type { TECHNOLOGIES } from "@/constants";
import type { StaticImageData } from "next/image";

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
