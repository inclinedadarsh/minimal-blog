import { TECHNOLOGIES } from "@/constants";
import type { TechnologyNameType } from "@/types";
import Image from "next/image";

const Technology = ({ name }: { name: TechnologyNameType }) => {
	const item = TECHNOLOGIES[name];

	return (
		<div
			key={name}
			className="flex items-center gap-2 border border-border rounded-md py-1 px-2"
		>
			<Image
				src={item.logo}
				alt={item.name}
				className="w-4 h-4 object-contain"
			/>
			<p className="text-sm">{item.name}</p>
		</div>
	);
};

export default Technology;
