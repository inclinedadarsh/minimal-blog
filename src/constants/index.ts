import { deepmindLogo, wemakedevsLogo } from "@/assets/companies";
import {
	awsLogo,
	bunLogo,
	claudeLogo,
	cppLogo,
	dockerLogo,
	fastapiLogo,
	gcpLogo,
	geminiLogo,
	gitLogo,
	huggingFaceLogo,
	kerasLogo,
	nextjsLogo,
	postgreLogo,
	pythonLogo,
	pytorchLogo,
	reactLogo,
	typescriptLogo,
} from "@/assets/technologies";
import type { ExperienceItemType, LinkType, TechnologyType } from "@/types";

export const TECHNOLOGIES = {
	python: {
		name: "Python",
		logo: pythonLogo,
	},
	pytorch: {
		name: "PyTorch",
		logo: pytorchLogo,
	},
	keras: {
		name: "Keras",
		logo: kerasLogo,
	},
	huggingFace: {
		name: "Hugging Face",
		logo: huggingFaceLogo,
	},
	cpp: {
		name: "C++",
		logo: cppLogo,
	},
	react: {
		name: "React.js",
		logo: reactLogo,
	},
	nextjs: {
		name: "Next.js",
		logo: nextjsLogo,
	},
	typescript: {
		name: "TypeScript",
		logo: typescriptLogo,
	},
	bun: {
		name: "Bun",
		logo: bunLogo,
	},
	fastapi: {
		name: "FastAPI",
		logo: fastapiLogo,
	},
	postgresql: {
		name: "PostgreSQL",
		logo: postgreLogo,
	},
	git: {
		name: "Git",
		logo: gitLogo,
	},
	aws: {
		name: "AWS",
		logo: awsLogo,
	},
	gcp: {
		name: "GCP",
		logo: gcpLogo,
	},
	docker: {
		name: "Docker",
		logo: dockerLogo,
	},
	gemini: {
		name: "Gemini",
		logo: geminiLogo,
	},
	claude: {
		name: "Claude",
		logo: claudeLogo,
	},
} satisfies Record<string, TechnologyType>;

export const EXPERIENCE_ITEMS: ExperienceItemType[] = [
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

export const HEADER_LINKS: LinkType[] = [
	{
		label: "twitter",
		href: "https://x.com/inclinedadarsh",
	},
	{
		label: "github",
		href: "https://github.com/inclinedadarsh",
	},
	{
		label: "linkedin",
		href: "https://linkedin.com/in/dubeyadarsh/",
	},
	{
		label: "cal.com",
		href: "https://cal.com/adarshdubey",
	},
];

export const NAV_LINKS: LinkType[] = [
	{
		label: "home",
		href: "/",
	},
	{
		label: "blogs",
		href: "/blog",
	},
	{
		label: "reading list",
		href: "https://readinglist.adarshdubey.com",
		openInNewTab: true,
	},
];
