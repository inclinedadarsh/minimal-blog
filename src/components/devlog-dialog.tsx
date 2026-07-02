"use client";

import matter from "gray-matter";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import type { DevlogEntry } from "@/types/devlog";
import { GITHUB_RAW_BASE } from "@/types/devlog";

type DevlogDialogProps = {
	devlog: DevlogEntry | null;
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export default function DevlogDialog({
	devlog,
	open,
	onOpenChange,
}: DevlogDialogProps) {
	const [body, setBody] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!devlog || !open) {
			setBody(null);
			setError(null);
			return;
		}

		setLoading(true);
		setError(null);
		setBody(null);

		fetch(`${GITHUB_RAW_BASE}/${devlog.filename}`)
			.then(res => {
				if (!res.ok) throw new Error("Failed to fetch devlog");
				return res.text();
			})
			.then(text => {
				const parsed = matter(text);
				setBody(parsed.content);
			})
			.catch(err => setError(err.message))
			.finally(() => setLoading(false));
	}, [devlog, open]);

	const title = devlog?.title ?? "";

	return (
		<Dialog open={open} onOpenChange={onOpenChange} modal={false}>
			<DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="text-xl text-foreground-title">
						{title}
					</DialogTitle>
				</DialogHeader>
				{loading ? (
					<div className="flex justify-center py-10">
						<Loader2 className="size-6 animate-spin text-foreground-body" />
					</div>
				) : error ? (
					<p className="text-red-400">{error}</p>
				) : body ? (
					<div className="prose">
						<ReactMarkdown>{body}</ReactMarkdown>
					</div>
				) : null}
			</DialogContent>
		</Dialog>
	);
}
