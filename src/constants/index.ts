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
		href: "/sitemap.xml",
		openInNewTab: true,
	},
	{
		label: "llms.txt",
		href: "/llms.txt",
		openInNewTab: true,
	},
];

export const TOY_PROJECTS: ProjectItemType[] = [
	{
		name: "FastAPI MCP Inspect",
		description:
			"Mount an MCP server onto your FastAPI application to let AI agents inspect your routes, endpoints, and schemas at runtime.",
		links: [
			{
				label: "github",
				href: "https://github.com/inclinedadarsh/fastapi-mcp-inspect",
				openInNewTab: true,
			},
			{
				label: "pypi",
				href: "https://pypi.org/project/fastapi-mcp-inspect/",
				openInNewTab: true,
			},
		],
		technologies: ["python", "fastapi"],
		tags: ["package"],
	},
	{
		name: "Inclitoken: BPE Tokenizer",
		description:
			"A simple Byte Pair Encoding (BPE) tokenizer implementation from scratch in Python, with custom training and encode/decode capabilities.",
		links: [
			{
				label: "github",
				href: "https://github.com/inclinedadarsh/inclitoken",
				openInNewTab: true,
			},
		],
		technologies: ["python"],
		tags: ["from scratch"],
	},
	{
		name: "Incliarray: N-dimensional Array Library",
		description:
			"PyTorch-like minimal N-dimensional float array library in C++ with row-major layout, stride-aware indexing, broadcasting, matmul, reductions, and lightweight reverse-mode autograd.",
		links: [
			{
				label: "github",
				href: "https://github.com/inclinedadarsh/incliarray",
				openInNewTab: true,
			},
		],
		technologies: ["cpp"],
		tags: ["from scratch"],
	},
	{
		name: "pplx-cli",
		description:
			"A powerful CLI tool for the Perplexity AI API — web search, AI chat, streaming, citations, and support for multiple models (Sonar, Sonar Pro, Reasoning).",
		links: [
			{
				label: "github",
				href: "https://github.com/inclinedadarsh/pplx-cli",
				openInNewTab: true,
			},
		],
		technologies: ["typescript"],
		tags: ["cli"],
	},
	{
		name: "K-Means Clustering in C",
		description:
			"Educational implementation of the k-means clustering algorithm in C using a custom Matrix struct.",
		links: [
			{
				label: "github",
				href: "https://github.com/inclinedadarsh/k-means-c",
				openInNewTab: true,
			},
		],
		technologies: ["cpp"],
		tags: ["from scratch"],
	},
	{
		name: "Logistic Regression in C",
		description:
			"Modular implementation of logistic regression with forward/backward pass approach, mimicking neural network style — all in C.",
		links: [
			{
				label: "github",
				href: "https://github.com/inclinedadarsh/logistic-regression-c",
				openInNewTab: true,
			},
		],
		technologies: ["cpp"],
		tags: ["from scratch"],
	},
	{
		name: "Neural Network in C",
		description:
			"Basic neural network implementations in C including a linear neuron (perceptron), non-linear single-layer network (OR gate), and multi-layer network (XOR gate).",
		links: [
			{
				label: "github",
				href: "https://github.com/inclinedadarsh/neural-network-in-c",
				openInNewTab: true,
			},
		],
		technologies: ["cpp"],
		tags: ["from scratch"],
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
		label: "logs",
		href: "/logs",
	},
	{
		label: "reading list",
		href: "/reading",
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
