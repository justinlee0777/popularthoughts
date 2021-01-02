import React from 'react';
import { Helmet } from 'react-helmet';

import { SEOConfig } from './seo.config';

export default function SEO(seo: SEOConfig): JSX.Element {
	// {seo.url && <meta property="og:url" content={seo.url} />}
	let articleTag: JSX.Element;

	if (seo.article) {
		articleTag = <meta property="og:type" content="article" />;
	}

	return (
		<Helmet title={seo.title}>
			<meta name="description" content={seo.description} />
			{articleTag}
			<meta property="og:title" content={seo.title} />
			<meta property="og:description" content={seo.description} />
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1"
			/>
		</Helmet>
	);
}
