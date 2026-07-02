"use server";

import { updateTag } from "next/cache";
import type { DevlogEntry, DevlogIndexEntry } from "@/types/devlog";
import { GITHUB_RAW_BASE } from "@/types/devlog";

export async function revalidateDevlogs(): Promise<{
	devlogs: DevlogEntry[];
	error: string | null;
}> {
	updateTag("devlogs");
	const res = await fetch(`${GITHUB_RAW_BASE}/index.json`, {
		cache: "no-store",
	});
	if (!res.ok) {
		return { devlogs: [], error: "Failed to fetch devlogs" };
	}
	const data = (await res.json()) as Record<string, DevlogIndexEntry>;
	const devlogs = Object.entries(data).map(([filename, meta], index) => ({
		...meta,
		filename,
		number: index + 1,
	}));
	return { devlogs, error: null };
}
