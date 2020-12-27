import { Link } from 'gatsby';
import React from 'react';

import { NavBarConfig } from './nav-bar.config';
import './nav-bar.css';

export default function NavBar(config: NavBarConfig): JSX.Element {
	const tabs = config.tabs.map((tab, i) => {
		return (
			<Link
				className="link"
				activeClassName="selected"
				key={i}
				to={tab.value}
			>
				{tab.label}
			</Link>
		);
	});

	return <nav className={config.className}>{tabs}</nav>;
}
