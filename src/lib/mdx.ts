import GHLink from "@/components/ui/gh-link";
import YouTubeEmbed from "@/components/ui/youtube-embed";
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
				// Only add target="_blank" for external links (not anchor links)
				const href = node.properties?.href as string;
				if (href && !href.startsWith("#")) {
					node.properties = node.properties || {};
					node.properties.target = "_blank";
					node.properties.rel = "noopener noreferrer";
				}
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

// Plugin to wrap table elements with a div wrapper
const rehypeTableWrapper = () => {
	return (tree: Root) => {
		const visit = (node: Element) => {
			if (node.type === "element" && node.tagName === "table") {
				// Create a wrapper div with class 'table-wrapper'
				const wrapper: Element = {
					type: "element",
					tagName: "div",
					properties: { className: "table-wrapper" },
					children: [node],
				};

				// Replace the table node with the wrapper
				// We need to find the parent and replace the child
				return wrapper;
			}

			if (node.children) {
				for (let i = 0; i < node.children.length; i++) {
					const child = node.children[i];
					if (child.type === "element") {
						const result = visit(child);
						if (result && result !== child) {
							// Replace the child with the wrapped result
							node.children[i] = result;
						}
					}
				}
			}
			return node;
		};

		for (let i = 0; i < tree.children.length; i++) {
			const child = tree.children[i];
			if (child.type === "element") {
				const result = visit(child);
				if (result && result !== child) {
					tree.children[i] = result;
				}
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
					rehypeTableWrapper,
				],
			},
		},
		components: {
			GHLink,
			YouTubeEmbed,
		},
	});
}
