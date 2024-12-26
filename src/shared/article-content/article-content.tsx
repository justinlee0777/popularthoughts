import React, { useRef } from 'react';

import { FlexibleBookComponent } from 'prospero/web/flexible-book';
import {
	listenToClickEvents,
	listenToKeyboardEvents,
} from 'prospero/web/book/listeners';
import { DefaultBookTheme } from 'prospero/web/book/theming';
import {
	DoublePageBookAnimation,
	SinglePageBookAnimation,
} from 'prospero/web/book/animations';
import { useBook } from 'prospero/web/react';
import { FlexibleBookElement } from 'prospero/types';

import { calculateDateString } from '../../functions/calculate-date-string';
import { ArticleContentConfig } from './article-content.config';
import styles from './article-content.module.css';

function createFlexibleBook(
	text: string,
	fontFamily: string
): FlexibleBookElement {
	return FlexibleBookComponent(
		{
			text,
			pageStyles: {
				computedFontFamily: fontFamily,
				computedFontSize: '14px',
				lineHeight: 28,
				padding: {
					top: 18,
					right: 18,
					bottom: 18,
					left: 18,
				},
			},
			mediaQueryList: [
				{
					pagesShown: 1,
					listeners: [listenToClickEvents],
					theme: DefaultBookTheme,
					pictureInPicture: {
						affectedElements: 'iframe',
						autoLock: true,
					},
					animation: new SinglePageBookAnimation(),
				},
				{
					pattern: {
						minWidth: 800,
					},
					config: {
						pagesShown: 2,
						listeners: [
							listenToClickEvents,
							listenToKeyboardEvents,
						],
						theme: DefaultBookTheme,
						pictureInPicture: {
							affectedElements: 'iframe',
							autoLock: true,
						},
						animation: new DoublePageBookAnimation(),
					},
				},
			],
		},
		{
			transformers: [
				{
					transform(text) {
						return text.replaceAll(/(<.+>)\n+/g, '$1');
					},
				},
			],
		},
		{
			styles: {
				width: '80vw',
				height: '74vh',
				maxWidth: '1200px',
				margin: 'auto',
			},
		}
	);
}

export default function ArticleContent(
	config: ArticleContentConfig
): JSX.Element {
	const { article, showBook, fontFamily } = config;

	const className = `${styles['article-content']} ${config.className}`;
	const renderedHtmlRef = useRef<HTMLDivElement>(null);

	useBook(
		renderedHtmlRef,
		() =>
			showBook
				? createFlexibleBook(article.htmlString, fontFamily)
				: null,
		[article, showBook, fontFamily]
	);

	return (
		<div className={className}>
			<h1 className={styles['article-header']}>{article.title}</h1>
			<time className={styles['date-time']} dateTime={article.createdAt}>
				{calculateDateString(article.createdAt)}
			</time>
			<div className={styles['divider']} />
			<div className={styles['rendered-html']} ref={renderedHtmlRef}>
				{!showBook && (
					<div
						dangerouslySetInnerHTML={{
							__html: article.htmlString,
						}}
					/>
				)}
			</div>
		</div>
	);
}
