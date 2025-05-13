import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const blogsDirectory = path.join(process.cwd(), "src/blogs");

export interface BlogMetadata {
	title: string;
	datePublished: string;
	slug: string;
	seoTitle?: string;
	seoDescription?: string;
}

export async function getAllBlogs(): Promise<BlogMetadata[]> {
	const fileNames = await fs.readdir(blogsDirectory);
	const allBlogsData = await Promise.all(
		fileNames.map(async fileName => {
			// Remove ".md" from file name to get slug
			const slug = fileName.replace(/\.md$/, "");

			// Read markdown file as string
			const fullPath = path.join(blogsDirectory, fileName);
			const fileContents = await fs.readFile(fullPath, "utf8");

			// Use gray-matter to parse the post metadata section
			const { data } = matter(fileContents);

			return {
				slug,
				title: data.title,
				datePublished: data.datePublished,
				seoTitle: data.seoTitle,
				seoDescription: data.seoDescription,
			};
		}),
	);

	// Sort posts by date
	return allBlogsData.sort((a, b) => {
		return (
			new Date(b.datePublished).getTime() -
			new Date(a.datePublished).getTime()
		);
	});
}

export async function getBlogBySlug(slug: string) {
	const fullPath = path.join(blogsDirectory, `${slug}.md`);
	const fileContents = await fs.readFile(fullPath, "utf8");

	// Use gray-matter to parse the post metadata section
	const { data, content } = matter(fileContents);

	return {
		slug,
		content,
		title: data.title,
		datePublished: data.datePublished,
		seoTitle: data.seoTitle,
		seoDescription: data.seoDescription,
	};
}
