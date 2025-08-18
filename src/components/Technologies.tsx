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
import type { TechnologyItemType } from "@/types";
import Image from "next/image";

const technologies: TechnologyItemType[] = [
	{
		name: "Python",
		logo: pythonLogo,
	},
	{
		name: "PyTorch",
		logo: pytorchLogo,
	},
	{
		name: "Keras",
		logo: kerasLogo,
	},
	{
		name: "Hugging Face",
		logo: huggingFaceLogo,
	},
	{
		name: "C++",
		logo: cppLogo,
	},
	{
		name: "React.js",
		logo: reactLogo,
	},
	{
		name: "Next.js",
		logo: nextjsLogo,
	},
	{
		name: "TypeScript",
		logo: typescriptLogo,
	},
	{
		name: "Bun",
		logo: bunLogo,
	},
	{
		name: "FastAPI",
		logo: fastapiLogo,
	},
	{
		name: "PostgreSQL",
		logo: postgreLogo,
	},
	{
		name: "Git",
		logo: gitLogo,
	},
	{
		name: "AWS",
		logo: awsLogo,
	},
	{
		name: "GCP",
		logo: gcpLogo,
	},
	{
		name: "Docker",
		logo: dockerLogo,
	},
	{
		name: "Gemini",
		logo: geminiLogo,
	},
	{
		name: "Claude",
		logo: claudeLogo,
	},
];

const Technologies = () => {
	return (
		<div className="mb-5 md:mb-10 space-y-3">
			<h2 className="text-2xl font-bold">Technologies</h2>
			<div className="flex flex-wrap gap-2">
				{technologies.map(item => (
					<div
						key={item.name}
						className="flex items-center gap-2 border border-border rounded-md py-1 px-2"
					>
						<Image
							src={item.logo}
							alt={item.name}
							className="w-4 h-4 object-contain"
						/>
						<p className="text-sm">{item.name}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Technologies;
