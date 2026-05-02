import { ArrowLeft, Bug } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
	return (
		<div className="flex flex-col items-start justify-center min-h-[60vh] space-y-6 py-10 md:py-20 animate-in fade-in duration-500">
			<div className="space-y-4">
				<div className="flex gap-3 items-end">
					<h1 className="text-3xl md:text-[40px] font-semibold font-serif">
						Lost in the void.
					</h1>
					<span className="hidden sm:block text-muted-foreground font-mono uppercase tracking-wider font-medium text-sm mb-1.5 md:mb-2 text-nowrap">
						{"{"}Error 404{"}"}
					</span>
				</div>
				<p className="text-lg text-muted-foreground max-w-[500px]">
					The page you're looking for seems to have vanished. It might
					have been removed, had its name changed, or is exploring the
					multiverse.
				</p>
			</div>

			<div className="flex flex-wrap gap-4 pt-4">
				<Link
					href="/"
					className={cn(
						buttonVariants({ variant: "default" }),
						"gap-2 group transition-all",
					)}
				>
					<ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
					Return Home
				</Link>
				<Link
					href="/blogs"
					className={cn(buttonVariants({ variant: "outline" }))}
				>
					Read the Blog
				</Link>
			</div>

			<hr className="w-full max-w-md my-8 border-neutral-200 dark:border-neutral-800" />

			<div className="w-full max-w-md border border-neutral-200 dark:border-neutral-800 rounded-md p-4 bg-muted/20">
				<div className="flex items-start gap-3 text-sm text-muted-foreground">
					<Bug className="h-5 w-5 mt-0.5 shrink-0" />
					<p className="leading-relaxed">
						Think you found a bug? I probably messed up a link
						somewhere. Feel free to{" "}
						<Link
							href="/"
							className="underline underline-offset-4 hover:text-foreground transition-colors"
						>
							contact me
						</Link>{" "}
						and let me know!
					</p>
				</div>
			</div>
		</div>
	);
}
