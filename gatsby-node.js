const path = require('path');

exports.createPages = async function ({ actions, graphql }) {
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
};
