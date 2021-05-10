import { Link } from 'gatsby';
import React from 'react';

import youtubeIcon from 'assets/youtube-icon.png';

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

	return (
		<nav className={config.className}>
			<div className="links social">
				<Link
					className="link social youtube"
					key="youtube"
					target="_blank"
					to="https://www.youtube.com/channel/UCVmcB2t71rU_J7dfE63a8RQ"
					rel="noopener noreferrer"
				>
					<img alt="Link to our Youtube channel." src={youtubeIcon} />
				</Link>
			</div>
			<div className="links categories">{tabs}</div>
		</nav>
	);
}
