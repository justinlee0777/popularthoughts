const config = {
	output: 'export',
	transpilePackages: ['prospero'],
	trailingSlash: true,
	images: {
		unoptimized: true,
	},
	experimental: {
		optimizeCss: false,
	},
};

module.exports = config;
