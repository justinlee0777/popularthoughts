import React from 'react';

import { Tab } from '../tab.config';
import { NavBarConfig } from './nav-bar.config';
import './nav-bar.css';

function getLinkClassName(tab: Tab): string {
	let className = 'link';

	if (tab.selected) {
		className = className + ' selected';
	}

	return className;
}

export default function NavBar(config: NavBarConfig): JSX.Element {
	const tabs = config.tabs.map(tab => {
		const className = getLinkClassName(tab);
		return (
			<a className={className} key={tab.value} href={tab.value}>
				{tab.label}
			</a>
		);
	});

	return <div className={config.className}>{tabs}</div>;
}
