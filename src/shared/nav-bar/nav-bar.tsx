import React from 'react';

import { NavBarConfig } from './nav-bar.config';
import './nav-bar.css';

export default function NavBar(config: NavBarConfig): JSX.Element {
	const tabs = config.tabs.map(({ label, value }) => {
		return (
			<a className="link" key={value} href={value}>
				{label}
			</a>
		);
	});

	return <div className={config.className}>{tabs}</div>;
}
