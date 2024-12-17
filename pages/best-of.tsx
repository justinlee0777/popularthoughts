import loadArticles from 'functions/load-articles.function';
import BestOfPage from 'shared/best-of-page/best-of-page';

export async function getStaticProps() {
	let articles = await loadArticles();

	articles = articles.filter(article =>
		article.display.tags.includes('best of')
	);

	return {
		props: {
			entries: articles.map(article => ({
				slug: article.slug,
				createdAt: article.display.createdAt,
				title: article.display.title,
				tags: article.display.tags,
				articleType: 'Article',
				rating: article.display.rating,
			})),
		},
	};
}

export default BestOfPage;
