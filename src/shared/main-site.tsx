import React from 'react';

import MainSiteContent from './main-site-content/main-site-content';
import { MainSiteConfig } from './main-site.config';
import './main-site.css';
import NavBar from './nav-bar/nav-bar';

export default function MainSite(config: {
	pageContext: MainSiteConfig;
	path: string;
}): JSX.Element {
	const tabs = config.pageContext.tabs.map(tab => {
		let selected = config.path.indexOf(tab.value) === 0;

		if (tab.value === '/') {
			selected = selected && config.path.length <= 1;
		}

		return {
			selected,
			...tab,
		};
	});

	return (
		<div className="main-site">
			<NavBar className="nav-bar" tabs={tabs}></NavBar>
			<MainSiteContent className="content"></MainSiteContent>
		</div>
	);
}
