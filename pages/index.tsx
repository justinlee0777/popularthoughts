import { readFile } from 'fs/promises';

import { Filter } from '../src/shared/filter.config';
import MainSite from '../src/shared/main-site';
import { Entry, SEO } from '../src/shared/main-site.config';
import { join } from 'path';
import loadArticles from '../src/functions/load-articles.function';

interface Props {
	seo: SEO;
	filters: Array<Filter>;
	entries: Array<Entry>;
}

export async function getStaticProps(): Promise<{ props: Props }> {
	const [filters, seo, articles] = await Promise.all([
		readFile(join(process.cwd(), 'src/data/main-page-filters.json'), {
			encoding: 'utf-8',
		}).then(text => JSON.parse(text) as Array<Filter>),
		readFile(join(process.cwd(), 'src/data/nav-bar.json'), {
			encoding: 'utf-8',
		}).then(text => JSON.parse(text) as SEO),
		loadArticles(),
	]);

	return {
		props: {
			filters,
			seo,
			entries: articles.map(article => ({
				slug: article.slug,
				createdAt: article.display.createdAt,
				title: article.display.title,
				tags: article.display.tags,
				articleType: 'Article',
			})),
		},
	};
}

export default function Homepage({
	seo,
	filters,
	entries,
}: Props): JSX.Element {
	return (
		<MainSite
			pageContext={{
				seo: {
					...seo,
					article: false,
				},
				filters,
				entries,
			}}
		/>
	);
}
