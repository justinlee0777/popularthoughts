import React from 'react';

import MainSiteContent from './main-site-content/main-site-content';
import { MainSiteConfig } from './main-site.config';
import './main-site.css';
import NavBar from './nav-bar/nav-bar';

export default function MainSite({
	pageContext,
	path,
}: {
	pageContext: MainSiteConfig;
	path: string;
}): JSX.Element {
	const tabs = pageContext.tabs.map(tab => {
		let selected = path.indexOf(tab.value) === 0;

		if (tab.value === '/') {
			selected = selected && path.length <= 1;
		}

		return {
			selected,
			...tab,
		};
	});

	return (
		<div className="main-site">
			<NavBar className="nav-bar" tabs={tabs}></NavBar>
			<MainSiteContent
				className="content"
				article={pageContext.article}
			></MainSiteContent>
		</div>
	);
}
