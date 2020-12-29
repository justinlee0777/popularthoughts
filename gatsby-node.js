const path = require('path');

/**
 * Get nav bar configuration.
 */
async function getNavBar(graphql) {
	return graphql(`
		{
			allNavBarJson {
				edges {
					node {
						label
						value
						markdownCriteria
					}
				}
			}
		}
	`);
}

/**
 * Get articles.
 */
async function getArticles(graphql) {
	return graphql(`
		{
			allMarkdownRemark {
				edges {
					node {
						html
						frontmatter {
							title
							slug
							youtubeUrl
							iframeTitle
						}
					}
				}
			}
		}
	`);
}

/**
 * Create the main pages that list created content ex. Home, Video.
 */
async function createMainPages(actions, navbarConfig, articles) {
	const allNavBarJson = navbarConfig.allNavBarJson;
	const tabs = allNavBarJson.edges.map(e => e.node);

	tabs.forEach(tab => {
		let markdown = articles.allMarkdownRemark.edges.map(e => {
			const node = e.node;
			const frontmatter = node.frontmatter;

			return {
				html: node.html,
				slug: frontmatter.slug,
				title: frontmatter.title,
				youtubeUrl: frontmatter.youtubeUrl,
			};
		});

		if (tab.markdownCriteria) {
			const mdCriteria = tab.markdownCriteria;

			markdown = markdown.filter(md => !!md[mdCriteria]);
		}

		actions.createPage({
			path: tab.value,
			component: path.resolve('src/shared/main-site.tsx'),
			context: { tabs, entries: markdown },
		});
	});

	return tabs;
}

/**
 * Create content pages that feature an article or a video.
 */
async function createArticleContentPages(actions, tabs, articles) {
	const allMarkdownRemark = articles.allMarkdownRemark;
	const markdown = allMarkdownRemark.edges.map(e => e.node);

	markdown.forEach(md => {
		const frontmatter = md.frontmatter;

		let article;

		if (frontmatter.html || frontmatter.youtubeUrl) {
			article = {
				htmlString: md.html,
				youtube: {
					youtubeUrl: md.frontmatter.youtubeUrl,
					iframeTitle: md.frontmatter.iframeTitle,
				},
			};
		}

		actions.createPage({
			path: md.frontmatter.slug,
			component: path.resolve('src/shared/main-site.tsx'),
			context: {
				tabs,
				article,
			},
		});
	});
}

exports.createPages = async function ({ actions, graphql }) {
	const { data: navbarConfig } = await getNavBar(graphql);
	const { data: articles } = await getArticles(graphql);

	const tabs = await createMainPages(actions, navbarConfig, articles);
	await createArticleContentPages(actions, tabs, articles);
};
