import rss from '@astrojs/rss';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
	const allPosts = import.meta.glob('./posts/**/*.md', { eager: true }) as Record<string, {
		frontmatter: { title: string; date: string; description?: string; published?: boolean };
		url: string;
	}>;

	const posts = Object.values(allPosts)
		.filter((post) => post.frontmatter.published)
		.sort((a, b) =>
			new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
		);

	return rss({
		title: 'ygashu.dev',
		description: 'Blog posts from ygashu.dev',
		site: context.site!.toString(),
		items: posts.map((post) => ({
			title: post.frontmatter.title,
			pubDate: new Date(post.frontmatter.date),
			description: post.frontmatter.description ?? '',
			link: post.url!,
		})),
	});
}
