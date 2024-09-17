import loadArticles, {
	PageProps,
} from '../src/functions/load-articles.function';
import MainSite from '../src/shared/main-site';

export async function getStaticPaths() {
	const articles = await loadArticles();

	return {
		paths: [
			...articles.map(article => ({
				params: {
					article: article.slug,
				},
			})),
		],
		fallback: false,
	};
}

export async function getStaticProps({
	params,
}): Promise<{ props: PageProps }> {
	const articles = await loadArticles();
	const props = articles.find(article => article.slug === params.article)!;

	return {
		props,
	};
}

export default function Article(props: PageProps): JSX.Element {
	return (
		<MainSite
			pageContext={{
				seo: {
					title: props.seo.title,
					description: props.seo.description,
					article: true,
				},
				article: {
					title: props.display.title,
					createdAt: props.display.createdAt,
					htmlString: props.display.contentHtml,
				},
			}}
		/>
	);
}
