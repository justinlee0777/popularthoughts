const path = require('path');

/**
 * Create the main pages that list created content ex. Home, Video.
 */
async function createMainPages(actions, graphql) {
	const { data } = await graphql(`
		{
			allNavBarJson {
				edges {
					node {
						label
						value
					}
				}
			}
		}
	`);
	const allNavBarJson = data.allNavBarJson;

	const tabs = allNavBarJson.edges.map(e => e.node);

	tabs.forEach(tab => {
		actions.createPage({
			path: tab.value,
			component: path.resolve('src/shared/main-site.tsx'),
			context: { tabs },
		});
	});

	return tabs;
}

/**
 * Create content pages that feature an article or a video.
 */
async function createArticleContentPages(actions, graphql, tabs) {
	const { data } = await graphql(`
		{
			allMarkdownRemark {
				edges {
					node {
						html
						frontmatter {
							slug
							youtubeUrl
							iframeTitle
						}
					}
				}
			}
		}
	`);
	const allMarkdownRemark = data.allMarkdownRemark;
	const markdown = allMarkdownRemark.edges.map(e => e.node);

	markdown.forEach(md => {
		actions.createPage({
			path: md.frontmatter.slug,
			component: path.resolve('src/shared/main-site.tsx'),
			context: {
				tabs,
				article: {
					htmlString: md.html,
					youtube: {
						youtubeUrl: md.frontmatter.youtubeUrl,
						iframeTitle: md.frontmatter.iframeTitle,
					},
				},
			},
		});
	});
}

exports.createPages = async function ({ actions, graphql }) {
	const tabs = await createMainPages(actions, graphql);
	await createArticleContentPages(actions, graphql, tabs);
};
