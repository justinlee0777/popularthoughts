/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
	/* Your site config here */
	plugins: [
		'gatsby-plugin-resolve-src',
		{
			resolve: 'gatsby-plugin-ts',
			options: {
				// Disable type checking in production
				typeCheck: process.env.NODE_ENV !== 'production',
			},
		},
	],
};
