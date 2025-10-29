import fs from "node:fs";
import path from "node:path";
import RSS from "rss";
import type { BlogMetadata } from "./blogs";

export async function generateRSS(posts: BlogMetadata[]) {
	const feed = new RSS({
		title: "Adarsh Dubey",
		description: "Adarsh Dubey's blog",
		site_url: process.env.SITE_URL || "https://adarshdubey.com",
		feed_url: `${process.env.SITE_URL || "https://adarshdubey.com"}/rss.xml`,
		language: "en-US",
	});

	for (const post of posts) {
		feed.item({
			title: post.title,
			description: post.seoDescription || "",
			url: `${process.env.SITE_URL || "https://adarshdubey.com"}/blog/${post.slug}`,
			date: new Date(post.datePublished),
		});
	}

	fs.writeFileSync(
		path.join(process.cwd(), "public/rss.xml"),
		feed.xml({ indent: true }),
	);
}
