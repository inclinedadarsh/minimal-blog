import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import type { Options as PrettyCodeOptions } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

const prettyCodeOptions: PrettyCodeOptions = {
	theme: "github-dark",
	onVisitLine(node) {
		// Prevent lines from collapsing in `display: grid` mode
		if (node.children.length === 0) {
			node.children = [{ type: "text", value: " " }];
		}
	},
	onVisitHighlightedLine(node) {
		node.properties.className?.push("highlighted");
	},
	onVisitHighlightedChars(node) {
		node.properties.className = ["word"];
	},
};

export async function compileMDXWithOptions(source: string) {
	return compileMDX({
		source,
		options: {
			parseFrontmatter: true,
			mdxOptions: {
				remarkPlugins: [remarkGfm],
				rehypePlugins: [
					rehypeSlug,
					[rehypeAutolinkHeadings, { behavior: "wrap" }],
					[rehypePrettyCode, prettyCodeOptions],
				],
			},
		},
	});
}
