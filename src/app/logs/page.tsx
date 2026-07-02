import type { DevlogEntry, DevlogIndexEntry } from "@/types/devlog";
import { GITHUB_RAW_BASE } from "@/types/devlog";
import LogsClient from "./logs-client";

export default async function LogsPage() {
	let devlogs: DevlogEntry[] = [];
	try {
		const res = await fetch(`${GITHUB_RAW_BASE}/index.json`, {
			next: { tags: ["devlogs"], revalidate: 43200 },
		});
		if (res.ok) {
			const data = (await res.json()) as Record<string, DevlogIndexEntry>;
			devlogs = Object.entries(data).map(([filename, meta], index) => ({
				...meta,
				filename,
				number: index + 1,
			}));
		}
	} catch {
		// fallback to empty on error
	}

	return <LogsClient initialDevlogs={devlogs} />;
}
