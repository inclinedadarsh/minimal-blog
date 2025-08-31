import { EXPERIENCE_ITEMS } from "@/constants";
import ExperienceItem from "./ExperienceItem";

const Experience = () => {
	return (
		<div className="mb-5 md:mb-10 space-y-3">
			<h2 className="text-2xl font-bold">Career highlights</h2>
			<div className="">
				{EXPERIENCE_ITEMS.map(item => (
					<ExperienceItem key={item.companyName} {...item} />
				))}
			</div>
		</div>
	);
};

export default Experience;
