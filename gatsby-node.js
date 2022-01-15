const path = require('path');

/**
 * Determine whether an article is an article or a video.
 */
function getArticleType(entry) {
	if (entry.youtubeUrl || entry.videoUrl) {
		// Having video takes primacy over any textual content.
		return 'Video';
	} else if (entry.audioUrl) {
		return 'Audio commentary';
	} else {
		return 'Article';
	}
}

/**
 * Get nav bar configuration.
 */
async function getNavBar(graphql) {
	return graphql(`
		{
			dataJson {
				label
				seoTitle
				seoDescription
			}
		}
	`);
}

async function getHomeFilters(graphql) {
	return graphql(`
		{
			allMainPageFiltersJson {
				edges {
					node {
						tagCriteria
						label
						value
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
							createdAt
							seoTitle
							seoDescription
							tags
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
 * Get hosted audio.
 */
async function getAudio(graphql) {
	return graphql(`
		{
			allFile(filter: { extension: { eq: "mp3" } }) {
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
async function createMainPage(
	actions,
	navbarConfig,
	articles,
	mainSiteFilters
) {
	const filters = mainSiteFilters.allMainPageFiltersJson.edges.map(edge => {
		const node = edge.node;
		return {
			tagCriteria: node.tagCriteria,
			value: node.value,
			label: node.label,
		};
	});

	const markdown = articles.allMarkdownRemark.edges.map(e => {
		const node = e.node;
		const frontmatter = node.frontmatter;

		return {
			html: node.html,
			slug: frontmatter.slug,
			title: frontmatter.title,
			audioUrl: frontmatter.audioUrl,
			videoUrl: frontmatter.videoUrl,
			youtubeUrl: frontmatter.youtubeUrl,
			createdAt: frontmatter.createdAt,
			tags: frontmatter.tags,
			articleType: getArticleType(frontmatter),
		};
	});

	actions.createPage({
		path: '/',
		component: path.resolve('src/shared/main-site.tsx'),
		context: {
			entries: markdown,
			filters,
			seo: {
				title: navbarConfig.dataJson.seoTitle,
				description: navbarConfig.dataJson.seoDescription,
				article: false,
			},
		},
	});
}

/**
 * Create content pages that feature an article or a video.
 */
async function createArticleContentPages(actions, articles, videos, audio) {
	const allMarkdownRemark = articles.allMarkdownRemark;
	const markdown = allMarkdownRemark.edges.map(e => e.node);
	const videoUrls = videos.allFile.edges.map(e => e.node.publicURL);
	const audioUrls = audio.allFile.edges.map(e => e.node.publicURL);

	markdown.forEach(md => {
		const frontmatter = md.frontmatter;

		let videoUrl;
		let audioUrl;
		if (frontmatter.videoUrl) {
			const vu = frontmatter.videoUrl;
			videoUrl = videoUrls.find(url => url.includes(vu));
		}

		if (frontmatter.audioUrl) {
			const au = frontmatter.audioUrl;
			audioUrl = audioUrls.find(url => url.includes(au));
		}

		const article = {
			title: frontmatter.title,
			createdAt: frontmatter.createdAt,
			htmlString: md.html,
			audioUrl,
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
	const { data: audio } = await getAudio(graphql);
	const { data: mainSiteFilters } = await getHomeFilters(graphql);

	await createMainPage(actions, navbarConfig, articles, mainSiteFilters);
	await createArticleContentPages(actions, articles, videos, audio);
};
