const path = require('path');

function evalMarkdownCriteria(criteria) {
	const tokens = criteria.split(' ');

	return entry => tokens.some(t => !!entry[t]);
}

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
						seoTitle
						seoDescription
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
							videoUrl
							iframeTitle
							createdAt
							seoTitle
							seoDescription
						}
					}
				}
			}
		}
	`);
}

/**
 * Get hosted videos.
 */
async function getVideos(graphql) {
	return graphql(`
		{
			allFile(filter: { extension: { eq: "mp4" } }) {
				edges {
					node {
						publicURL
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
				videoUrl: frontmatter.videoUrl,
				youtubeUrl: frontmatter.youtubeUrl,
				createdAt: frontmatter.createdAt,
			};
		});

		if (tab.markdownCriteria) {
			const mdCriteria = evalMarkdownCriteria(tab.markdownCriteria);

			markdown = markdown.filter(md => mdCriteria(md));
		}

		actions.createPage({
			path: tab.value,
			component: path.resolve('src/shared/main-site.tsx'),
			context: {
				tabs,
				entries: markdown,
				seo: {
					title: tab.seoTitle,
					description: tab.seoDescription,
					article: false,
				},
			},
		});
	});

	return tabs;
}

/**
 * Create content pages that feature an article or a video.
 */
async function createArticleContentPages(actions, tabs, articles, videos) {
	const allMarkdownRemark = articles.allMarkdownRemark;
	const markdown = allMarkdownRemark.edges.map(e => e.node);
	const videoUrls = videos.allFile.edges.map(e => e.node.publicURL);

	markdown.forEach(md => {
		const frontmatter = md.frontmatter;

		let videoUrl;
		if (frontmatter.videoUrl) {
			const vu = frontmatter.videoUrl;
			videoUrl = videoUrls.find(url => url.includes(vu));
		}

		const article = {
			title: frontmatter.title,
			createdAt: frontmatter.createdAt,
			htmlString: md.html,
			video: {
				videoUrl,
				youtubeUrl: frontmatter.youtubeUrl,
				iframeTitle: frontmatter.iframeTitle,
			},
		};

		actions.createPage({
			path: frontmatter.slug,
			component: path.resolve('src/shared/main-site.tsx'),
			context: {
				tabs,
				article,
				seo: {
					title: frontmatter.seoTitle,
					description: frontmatter.seoDescription,
					article: true,
				},
			},
		});
	});
}

exports.createPages = async function ({ actions, graphql }) {
	const { data: navbarConfig } = await getNavBar(graphql);
	const { data: articles } = await getArticles(graphql);
	const { data: videos } = await getVideos(graphql);

	const tabs = await createMainPages(actions, navbarConfig, articles);
	await createArticleContentPages(actions, tabs, articles, videos);
};
