import type { PhrasingContent, Root } from "mdast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

// Regular expression to match [text|tooltip]
// - \[ : Matches literal "["
// - ([^\]|]+) : Captures anything that is not "]" or "|" (the text)
// - \| : Matches literal "|"
// - ([^\]]+) : Captures anything that is not "]" (the tooltip)
// - \] : Matches literal "]"
const TOOLTIP_REGEX = /\[([^\]|]+)\|([^\]]+)\]/;

/**
 * Remark plugin to parse custom [text|tooltip text] syntax and convert it
 * into <MarkdownTooltip text="text" content="tooltip text" /> JSX nodes.
 */
export const remarkTooltip: Plugin<[], Root> = () => {
	return tree => {
		visit(tree, "text", (node, index, parent) => {
			// Find matches in the text node
			if (!node.value || !parent || typeof index !== "number") return;

			const match = node.value.match(TOOLTIP_REGEX);
			if (!match) return;

			const fullMatch = match[0];
			const text = match[1];
			const tooltip = match[2];

			// Calculate start index of the match to split the text
			const matchIndex = node.value.indexOf(fullMatch);

			// The text before the match
			const beforeStr = node.value.substring(0, matchIndex);
			// The text after the match
			const afterStr = node.value.substring(
				matchIndex + fullMatch.length,
			);

			const newNodes: PhrasingContent[] = [];

			if (beforeStr) {
				newNodes.push({ type: "text", value: beforeStr });
			}

			// Create the JSX element node for MDX
			// See: https://github.com/syntax-tree/mdast-util-mdx-jsx
			newNodes.push({
				type: "mdxJsxTextElement",
				name: "MarkdownTooltip",
				attributes: [
					{
						type: "mdxJsxAttribute",
						name: "text",
						value: text,
					},
					{
						type: "mdxJsxAttribute",
						name: "content",
						value: tooltip,
					},
				],
				children: [],
			} as unknown as PhrasingContent);

			if (afterStr) {
				newNodes.push({ type: "text", value: afterStr });
			}

			// Replace the current text node with the array of new nodes
			parent.children.splice(index, 1, ...newNodes);

			// Note: We don't advance the index because we might need to process
			// the `afterStr` text node as well for multiple tooltips in one text block
		});
	};
};
