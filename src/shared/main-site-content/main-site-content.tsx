import { Link } from 'gatsby';
import React from 'react';

import ArticleContent from '../article-content/article-content';
import { MainSiteContentConfig } from './main-site-content.config';
import './main-site-content.css';

export default function MainSiteContent(
	config: MainSiteContentConfig
): JSX.Element {
	const className = `main-site-content ${config.className}`;

	let content: JSX.Element;

	if (config.article) {
		content = (
			<ArticleContent article={config.article} className="article" />
		);
	}

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
