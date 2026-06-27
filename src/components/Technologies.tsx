import { TECHNOLOGIES } from "@/constants";
import type { TechnologyNameType } from "@/types";
import Technology from "./Technology";

const Technologies = () => {
	return (
		<div className="">
			<div className="flex items-center gap-6 mb-6">
				<h2 className="text-xl font-mono uppercase text-foreground-title shrink-0">
					Technologies
				</h2>
				<div className="w-full h-[1px] bg-border" />
			</div>
			<div className="flex flex-wrap gap-2">
				{Object.keys(TECHNOLOGIES).map(item => (
					<Technology key={item} name={item as TechnologyNameType} />
				))}
			</div>
		</div>
	);
};

export default Technologies;
