const path = require('path');

/**
 * Using the criteria of a listing on the nav bar, filter out articles.
 */
function evalTagCriteria(criteria) {
	return entry => {
		const tags = entry.tags ?? [];
		return criteria.some(c => tags.includes(c));
	};
}

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
			allNavBarJson {
				edges {
					node {
						label
						value
						tagCriteria
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
							audioUrl
							youtubeUrl
							videoUrl
							iframeTitle
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
async function createMainPages(actions, navbarConfig, articles) {
	const allNavBarJson = navbarConfig.allNavBarJson;
	const tabs = allNavBarJson.edges.map(e => e.node);

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

	tabs.forEach(tab => {
		let m = markdown;

		if (tab.tagCriteria) {
			const mdCriteria = evalTagCriteria(tab.tagCriteria);

			m = m.filter(md => mdCriteria(md));
		}

		actions.createPage({
			path: tab.value,
			component: path.resolve('src/shared/main-site.tsx'),
			context: {
				tabs,
				entries: m,
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
async function createArticleContentPages(
	actions,
	tabs,
	articles,
	videos,
	audio
) {
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
	const { data: audio } = await getAudio(graphql);

	const tabs = await createMainPages(actions, navbarConfig, articles);
	await createArticleContentPages(actions, tabs, articles, videos, audio);
};
