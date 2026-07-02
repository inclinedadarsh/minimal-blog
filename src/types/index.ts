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
	tags?: string[];
};

export type ColumnDef = {
	id: string;
	name: string;
	type: string;
	isLink?: boolean;
	options?: { id: string; name: string }[];
};

export type Row = {
	id: string;
	cells: Record<string, string | null>;
	createdTime: string;
	lastEditedTime: string;
};
