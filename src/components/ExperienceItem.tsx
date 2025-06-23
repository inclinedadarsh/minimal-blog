import type { ExperienceItemType } from "@/types";
import Image from "next/image";
import Link from "next/link";

const ExperienceItem = ({
	companyName,
	companyLogo,
	workTitle,
	workDuration,
	compnayWebsite,
}: ExperienceItemType) => {
	return (
		<Link
			href={compnayWebsite}
			target="_blank"
			rel="noopener noreferrer"
			className="flex max-[500px]:flex-col flex-row justify-between max-[500px]:items-start items-center gap-4 py-4 hover:bg-muted rounded-md hover:px-4 transition-all duration-300"
		>
			<div className="flex items-center gap-4">
				<Image
					src={companyLogo}
					alt={companyName}
					className="w-10 h-10 border border-border rounded-full"
				/>
				<div className="flex flex-col">
					<h3 className="font-bold text-lg">{companyName}</h3>
					<p className="text-sm md:text-base text-muted-foreground">
						{workTitle}
					</p>
				</div>
			</div>
			<p className="text-sm md:text-base text-muted-foreground max-[500px]:self-end">
				{workDuration}
			</p>
		</Link>
	);
};

export default ExperienceItem;
