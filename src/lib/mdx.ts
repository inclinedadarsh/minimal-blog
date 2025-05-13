import type { Element, Root } from "hast";
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

// Plugin to make all links open in new tab
const rehypeExternalLinks = () => {
	return (tree: Root) => {
		// Find all link nodes
		const visit = (node: Element) => {
			if (node.type === "element" && node.tagName === "a") {
				// Add target="_blank" and rel="noopener noreferrer"
				node.properties = node.properties || {};
				node.properties.target = "_blank";
				node.properties.rel = "noopener noreferrer";
			}
			if (node.children) {
				for (const child of node.children) {
					if (child.type === "element") {
						visit(child);
					}
				}
			}
		};
		for (const child of tree.children) {
			if (child.type === "element") {
				visit(child);
			}
		}
		return tree;
	};
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
					rehypeExternalLinks,
				],
			},
		},
	});
}
