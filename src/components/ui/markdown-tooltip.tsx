import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

export function MarkdownTooltip({
	text,
	content,
}: {
	text: string;
	content: string;
}) {
	return (
		<TooltipProvider delayDuration={200}>
			<Tooltip>
				<TooltipTrigger asChild>
					<span className="border-b border-dashed border-primary/50 cursor-help transition-colors hover:border-primary">
						{text}
					</span>
				</TooltipTrigger>
				<TooltipContent sideOffset={4}>
					<p>{content}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
