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
import type { TechnologyType } from "@/types";

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
