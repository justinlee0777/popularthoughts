import './main-site.css';

import React from 'react';

import MainSiteContent from './main-site-content/main-site-content';
import MainSiteListing from './main-site-listing/main-site-listing';
import { MainSiteConfig, SEO } from './main-site.config';
import SEOComponent from './seo';

function createSEO(seo: SEO): JSX.Element {
	return (
		<SEOComponent
			title={seo.title}
			description={seo.description}
			article={seo.article}
		/>
	);
}

export default function MainSite({
	pageContext,
}: {
	pageContext: MainSiteConfig;
}): JSX.Element {
	let content: JSX.Element;

	if (pageContext.article) {
		content = (
			<MainSiteContent
				className="content"
				article={pageContext.article}
			></MainSiteContent>
		);
	} else if (pageContext.entries) {
		content = (
			<MainSiteListing
				className="main-site-listing"
				entries={pageContext.entries}
				filters={pageContext.filters}
			/>
		);
	}

	const seo = createSEO(pageContext.seo);

	return (
		<div className="main-site" lang="en-US">
			{seo}
			{content}
		</div>
	);
}
