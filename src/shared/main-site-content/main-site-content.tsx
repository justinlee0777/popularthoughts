import { Link } from 'gatsby';
import React from 'react';

import { addWindowArrowKeyScrollListener } from '../../utils/add-window-arrow-key-scroll-listener.function';
import ArticleContent from '../article-content/article-content';
import { MainSiteContentConfig } from './main-site-content.config';
import './main-site-content.css';

export default function MainSiteContent(
	config: MainSiteContentConfig
): JSX.Element {
	const mainSiteContentSelector = 'main-site-content';
	const className = `${mainSiteContentSelector} ${config.className}`;

	let content: JSX.Element;

	if (config.article) {
		content = (
			<ArticleContent article={config.article} className="article" />
		);
	}

	React.useEffect(function setUpScrollListener(): () => void {
		return addWindowArrowKeyScrollListener(`.${mainSiteContentSelector}`);
	});

	return (
		<React.Fragment>
			<div className="content-header">
				<Link className="back-link" to="/">
					Back
				</Link>
			</div>
			<div className={className}>{content}</div>
		</React.Fragment>
	);
}
