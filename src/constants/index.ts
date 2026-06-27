import {
	deepmindLogo,
	tangentLabLogo,
	wemakedevsLogo,
} from "@/assets/companies";
import {
	awsLogo,
	claudeLogo,
	cppLogo,
	dockerLogo,
	fastapiLogo,
	gcpLogo,
	geminiLogo,
	gitLogo,
	huggingFaceLogo,
	nextjsLogo,
	postgreLogo,
	pythonLogo,
	pytorchLogo,
	reactLogo,
	typescriptLogo,
} from "@/assets/technologies";
import type {
	ExperienceItemType,
	LinkType,
	ProjectItemType,
	TechnologyType,
} from "@/types";

export const TECHNOLOGIES = {
	python: {
		name: "Python",
		logo: pythonLogo,
	},
	pytorch: {
		name: "PyTorch",
		logo: pytorchLogo,
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
		companyName: "Tangent Lab",
		companyLogo: tangentLabLogo,
		workTitle: "Experimental one-person AI lab.",
		workDuration: "May 2026 — Present",
		compnayWebsite: "https://tangentlab.xyz",
	},
	{
		companyName: "Google DeepMind",
		companyLogo: deepmindLogo,
		workTitle: "GSoC '25 contributor",
		workDuration: "May 2025 — Sept 2025",
		compnayWebsite: "https://deepmind.google",
	},
	{
		companyName: "WeMakeDevs",
		companyLogo: wemakedevsLogo,
		workTitle: "Web developer & core team member",
		workDuration: "2023 — 2025",
		compnayWebsite: "https://wemakedevs.org",
	},
];

export const HEADER_LINKS: LinkType[] = [
	{
		label: "twitter",
		href: "https://x.com/inclinedadarsh",
		openInNewTab: true,
	},
	{
		label: "github",
		href: "https://github.com/inclinedadarsh",
		openInNewTab: true,
	},
	{
		label: "linkedin",
		href: "https://linkedin.com/in/dubeyadarsh/",
		openInNewTab: true,
	},
	// {
	// 	label: "peerlist",
	// 	href: "https://peerlist.io/inclinedadarsh",
	// 	openInNewTab: true,
	// },
	{
		label: "cal.com",
		href: "https://cal.com/adarshdubey",
		openInNewTab: true,
	},
];

export const FOOTER_LINKS: LinkType[] = [
	{
		label: "rss",
		href: "/rss.xml",
		openInNewTab: true,
	},
	{
		label: "sitemap",
		href: "/sitemal.xml",
		openInNewTab: true,
	},
	{
		label: "llms.txt",
		href: "/llms.txt",
		openInNewTab: true,
	},
];

export const NAV_LINKS: LinkType[] = [
	{
		label: "home",
		href: "/",
	},
	{
		label: "projects",
		href: "/projects",
	},
	{
		label: "blogs",
		href: "/blogs",
	},
	{
		label: "reading list",
		href: "https://readinglist.adarshdubey.com",
		openInNewTab: true,
	},
];

export const PROJECTS: ProjectItemType[] = [
	{
		name: "Facet: Gemma Finetuner",
		description:
			"An end-to-end platform that lets users preprocess datasets, fine-tune Gemma models, run inference, and export them in different formats.",
		links: [
			{
				label: "github",
				href: "https://github.com/gemma-facet",
				openInNewTab: true,
			},
		],
		technologies: ["fastapi", "python", "nextjs", "huggingFace", "gcp"],
	},
	{
		name: "Anon: Social Media Forum",
		description:
			"Anon Forum is an anonymous social platform for my college using optimistic UI, and ensures anonymity through college verification with no personal data storage.",
		links: [
			{
				label: "github",
				href: "https://github.com/inclinedadarsh/anon",
				openInNewTab: true,
			},
			{
				label: "demo",
				href: "https://anon.adarshdubey.com",
				openInNewTab: true,
			},
		],
		technologies: ["nextjs", "fastapi", "python", "aws", "postgresql"],
	},
	{
		name: "Inclinet: Neural network library",
		description:
			"Built a neural network library from scratch in Python with PyTorch-like APIs, supporting multiple activation functions, losses, and optimizers, designed using OOP principles for clarity, flexibility, and maintainability.",
		links: [
			{
				label: "github",
				href: "https://github.com/inclinedadarsh/inclinet",
				openInNewTab: true,
			},
		],
		technologies: ["python"],
	},
	{
		name: "Incligrad: Autograd engine in C++",
		description:
			"Implemented a PyTorch-like autograd library in C++ from scratch, including full backpropagation logic, enabling gradient-based learning without relying on existing frameworks.",
		links: [
			{
				label: "github",
				href: "https://github.com/inclinedadarsh/incligrad",
				openInNewTab: true,
			},
		],
		technologies: ["cpp"],
	},
];
