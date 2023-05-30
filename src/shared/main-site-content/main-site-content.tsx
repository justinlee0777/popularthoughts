import './main-site-content.css';

import { Link } from 'gatsby';
import React, { useEffect, useState } from 'react';

import Switch from 'shared/switch/switch';

import { addWindowArrowKeyScrollListener } from '../../utils/add-window-arrow-key-scroll-listener.function';
import ArticleContent from '../article-content/article-content';
import { MainSiteContentConfig } from './main-site-content.config';
import loadBookerlyFont from 'functions/load-bookerly-font.function';

export default function MainSiteContent(
	config: MainSiteContentConfig
): JSX.Element {
	const mainSiteContentSelector = 'main-site-content';
	const className = `${mainSiteContentSelector} ${config.className}`;

	const [showBook, setShowBook] = useState(false);
	const [bookerlyLoaded, setBookerlyLoaded] = useState(false);

	let content: JSX.Element;

	if (config.article) {
		content = (
			<ArticleContent
				article={config.article}
				showBook={showBook}
				bookerlyLoaded={bookerlyLoaded}
				className="article"
			/>
		);
	}

	useEffect(function setUpScrollListener(): () => void {
		return addWindowArrowKeyScrollListener(`.${mainSiteContentSelector}`);
	}, []);

	useEffect(() => {
		(async function () {
			await loadBookerlyFont();

			setBookerlyLoaded(true);
		})();
	}, []);

	return (
		<React.Fragment>
			<div className="content-header">
				<Link className="back-link" to="/">
					Back
				</Link>
				<div className="toggle-text">Show as book</div>
				<Switch
					className="toggle"
					value={showBook}
					onChange={on => setShowBook(on)}
				/>
			</div>
			<div className={className}>{content}</div>
		</React.Fragment>
	);
}
