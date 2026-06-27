import { EXPERIENCE_ITEMS } from "@/constants";
import ExperienceItem from "./ExperienceItem";

const Experience = () => {
	return (
		<div className="mb-10 md:mb-20 space-y-3">
			<div className="flex items-center gap-6">
				<h2 className="text-xl font-mono uppercase text-foreground-title shrink-0">
					Career highlights
				</h2>
				<div className="w-full h-[1px] bg-border" />
			</div>
			<div className="">
				{EXPERIENCE_ITEMS.map(item => (
					<ExperienceItem key={item.companyName} {...item} />
				))}
			</div>
		</div>
	);
};

export default Experience;
