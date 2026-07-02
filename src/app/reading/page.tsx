"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import ReadingTable from "@/components/ReadingTable";
import type { ColumnDef, Row } from "@/types";

export default function ReadingPage() {
	const [data, setData] = useState<{
		columns: ColumnDef[];
		rows: Row[];
	} | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("/api/reading")
			.then(res => res.json())
			.then(json => {
				if (json.error) {
					setError(json.error);
				} else {
					setData(json);
				}
			})
			.catch(err => setError(err.message))
			.finally(() => setLoading(false));
	}, []);

	return (
		<div className="container mx-auto md:mt-5">
			<h1 className="text-3xl md:text-[40px] font-semibold font-serif mb-5 md:mb-6 text-foreground-title">
				Reading List
			</h1>
			<p className="text-foreground-body mb-8 md:mb-10 leading-relaxed">
				This web page contains (almost) all the blogs, books, etc. I
				have ever read or I'm interested in reading. Moreover, I have
				also categorized them accordingly and have added resources
				wherever I can.
				<br />
				<br />
				This website is inspired by{" "}
				<a
					href="https://readinglibrary.vercel.app/"
					target="_blank"
					rel="noopener noreferrer"
					className="underline underline-offset-2 hover:text-foreground-title transition-colors"
				>
					@astledsa's reading library
				</a>
				.
			</p>

			{loading ? (
				<div className="flex justify-center py-20">
					<Loader2 className="size-8 animate-spin text-foreground-body" />
				</div>
			) : error ? (
				<p className="text-red-400">{error}</p>
			) : data ? (
				<ReadingTable columns={data.columns} rows={data.rows} />
			) : null}
		</div>
	);
}
