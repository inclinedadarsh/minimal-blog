import { TECHNOLOGIES } from "@/constants";
import type { TechnologyNameType } from "@/types";
import Technology from "./Technology";

const Technologies = () => {
	return (
		<div className="mb-5 md:mb-10 space-y-3">
			<h2 className="text-2xl font-bold">Technologies</h2>
			<div className="flex flex-wrap gap-2">
				{Object.keys(TECHNOLOGIES).map(item => (
					<Technology key={item} name={item as TechnologyNameType} />
				))}
			</div>
		</div>
	);
};

export default Technologies;
