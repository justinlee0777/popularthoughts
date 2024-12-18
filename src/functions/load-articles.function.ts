import { readdir, readFile } from 'fs/promises';
import matter from 'gray-matter';
import { join } from 'path';
import { remark } from 'remark';
import html from 'remark-html';

export interface PageProps {
	slug: string;
	display: {
		title: string;
		createdAt: string;
		contentHtml: string;
		tags: Array<string>;
		rating: number;
	};
	seo: {
		title: string;
		description: string;
	};
}

async function markdownToHtmlString(markdown: string): Promise<string> {
	return remark()
		.use(html, { sanitize: false })
		.process(markdown)
		.then(content => {
			return content.toString();
		});
}

export default async function loadArticles(): Promise<Array<PageProps>> {
	const fileDirectory = join(process.cwd(), 'src/data/articles');

	const asyncLoadedFileContent = (await readdir(fileDirectory)) // Get all saved .md files
		.filter(filename => filename.includes('.md'))
		.map(markdownFile => {
			return readFile(join(fileDirectory, markdownFile), {
				encoding: 'utf-8',
			}).then((file: string) => {
				const result = matter(file);

				return markdownToHtmlString(result.content).then(content => {
					const contentHtml = content.toString();

					return {
						slug: result.data.slug,
						display: {
							contentHtml,
							title: result.data.title,
							tags: result.data.tags,
							rating: result.data.rating ?? null,
						},
						seo: {
							title: result.data.seoTitle,
							description: result.data.seoDescription,
						},
						timestamp: new Date(result.data.createdAt),
					};
				});
			});
		});

	const fileContent = await Promise.all(asyncLoadedFileContent);

	return fileContent
		.sort((a, b) => {
			return b.timestamp.getTime() - a.timestamp.getTime();
		})
		.map(config => {
			const newConfig = {
				...config,
				display: {
					...config.display,
					createdAt: config.timestamp.toDateString(),
				},
			};

			delete (newConfig as any).timestamp;

			return newConfig;
		});
}
