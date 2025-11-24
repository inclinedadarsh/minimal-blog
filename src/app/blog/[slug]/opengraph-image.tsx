import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getAllBlogs, getBlogBySlug } from "@/lib/blogs";
import { ImageResponse } from "next/og";

export async function generateStaticParams() {
	const blogs = await getAllBlogs();
	return blogs.map(blog => ({
		slug: blog.slug,
	}));
}

export const size = {
	width: 1200,
	height: 630,
};

async function loadGoogleFont() {
	const url =
		"https://fonts.googleapis.com/css2?family=Libre+Baskerville&display=swap";
	const css = await (await fetch(url)).text();
	const resource = css.match(
		/src: url\((.+?)\) format\('(opentype|truetype|woff2)'\)/,
	);
	if (resource) {
		const response = await fetch(resource[1]);
		if (response.status === 200) {
			return await response.arrayBuffer();
		}
	}
	throw new Error("Failed to load font data");
}

export default async function Image({
	params,
}: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const blog = await getBlogBySlug(slug);

	const fontData = await loadGoogleFont();

	const profileImageData = await readFile(
		join(process.cwd(), "src", "assets", "profile-image.png"),
	);
	const profileImageSrc = Uint8Array.from(profileImageData).buffer;

	return new ImageResponse(
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				padding: "62px",
				backgroundColor: "#f5f4f0",
				fontFamily: "Libre Baskerville",
				color: "#191918",
				width: "100%",
				height: "100%",
			}}
		>
			<h1
				style={{
					fontSize: "58px",
					lineHeight: "140%",
				}}
			>
				{blog.ogTitle
					? blog.ogTitle
					: blog.title[0].toUpperCase() +
						blog.title.slice(1).toLowerCase()}
			</h1>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						gap: "24px",
					}}
				>
					<img
						src={profileImageSrc as unknown as string}
						alt="Adarsh Dubey"
						width={67}
						height={67}
						style={{
							transform: "rotate(-5deg)",
							boxShadow: "4px 4px 10px 0px rgba(0, 0, 0, 0.25)",
							borderRadius: "11px",
						}}
					/>
					<p
						style={{
							fontSize: "36px",
							color: "#191918",
						}}
					>
						Adarsh Dubey
					</p>
				</div>
				<p
					style={{
						fontSize: "36px",
						color: "#7a7a78",
					}}
				>
					{new Date(blog.datePublished).toLocaleDateString("en-US", {
						month: "short",
						day: "numeric",
						year: "numeric",
					})}
				</p>
			</div>
		</div>,
		{
			...size,
			fonts: [
				{
					name: "Libre Baskerville",
					data: fontData,
					style: "normal",
				},
			],
		},
	);
}
