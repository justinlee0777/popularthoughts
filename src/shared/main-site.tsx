import React from 'react';

import { MainSiteConfig } from './main-site.config';
import './main-site.css';
import NavBar from './nav-bar/nav-bar';

export default function MainSite(config: MainSiteConfig): JSX.Element {
	return (
		<div className="main-site">
			<NavBar className="nav-bar" tabs={config.tabs}></NavBar>
			<div className="content">{config.children}</div>
		</div>
	);
}
