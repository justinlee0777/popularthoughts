import loadArticles from 'functions/load-articles.function';
import SongOfTheWeek2024Page from 'shared/song-of-the-week-2024/song-of-the-week-2024';

export async function getStaticProps() {
	let articles = await loadArticles();

	articles = articles.filter(article =>
		article.display.tags.includes('song of the week')
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

export default SongOfTheWeek2024Page;
