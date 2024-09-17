import styles from './main-site-content.module.css';

import React, { useEffect, useState } from 'react';

import Switch from '../../shared/switch/switch';

import { addWindowArrowKeyScrollListener } from '../../utils/add-window-arrow-key-scroll-listener.function';
import ArticleContent from '../article-content/article-content';
import { MainSiteContentConfig } from './main-site-content.config';
import Link from 'next/link';

export default function MainSiteContent(
	config: MainSiteContentConfig
): JSX.Element {
	const mainSiteContentSelector = styles['main-site-content'];
	const className = `${mainSiteContentSelector} ${config.className}`;

	const [showBook, setShowBook] = useState(false);

	let content: JSX.Element;

	if (config.article) {
		content = (
			<ArticleContent
				article={config.article}
				showBook={showBook}
				fontFamily={config.fontFamily}
				className="article"
			/>
		);
	}

	useEffect(function setUpScrollListener(): () => void {
		return addWindowArrowKeyScrollListener(`.${mainSiteContentSelector}`);
	}, []);

	return (
		<React.Fragment>
			<div className={styles['content-header']}>
				<Link className={styles['back-link']} href="/">
					Back
				</Link>
				<div className={styles['toggle-text']}>Show as book</div>
				<Switch
					className={styles['toggle']}
					value={showBook}
					onChange={on => setShowBook(on)}
				/>
			</div>
			<div className={className}>{content}</div>
		</React.Fragment>
	);
}
