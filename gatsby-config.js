/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
	plugins: [
		'gatsby-plugin-resolve-src',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: 'src/data',
			},
		},
		'gatsby-transformer-json',
		'gatsby-transformer-remark',
		{
			resolve: 'gatsby-plugin-ts',
			options: {
				// Disable type checking in production
				typeCheck: process.env.NODE_ENV !== 'production',
			},
		},
	],
};
