// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	site: "https://ygashu.dev",
	experimental: {
		fonts: [
			{
				name: "Charter",
				cssVariable: "--font-charter",
				provider: "local",
				variants: [
					{ src: ["./src/assets/fonts/Charter.woff2"] },
					{ src: ["./src/assets/fonts/Charter-Bold.woff2"] },
					{ src: ["./src/assets/fonts/Charter-Italic.woff2"] },
					{ src: ["./src/assets/fonts/Charter-BoldItalic.woff2"] },
				],
			},
		],
	},

	markdown: {
		shikiConfig: {
			theme: "github-dark",
			transformers: [
				{
					pre(node) {
						const lang = node.properties.dataLanguage;
						return {
							type: "element",
							tagName: "div",
							properties: {
								class: "code-wrapper",
								dataLanguage: lang,
							},
							children: [node],
						};
					},
				},
			],
		},
	},
});
