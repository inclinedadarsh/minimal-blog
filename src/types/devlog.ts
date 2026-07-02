export type DevlogIndexEntry = {
	title: string;
	description: string;
	date: string;
};

export type DevlogEntry = DevlogIndexEntry & {
	filename: string;
	number: number;
};

export const GITHUB_RAW_BASE =
	"https://raw.githubusercontent.com/inclinedadarsh/devlogs/refs/heads/main/content";
