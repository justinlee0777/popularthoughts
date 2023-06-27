import React, { useRef } from 'react';

import { NewlineTransformer } from 'prospero/web/transformers';
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

import { calculateDateString } from 'functions/calculate-date-string';

import AudioContent from '../audio-content/audio-content';
import VideoContent from '../video-content/video-content';
import YoutubeVideo from '../youtube-video/youtube-video';
import { ArticleContentConfig } from './article-content.config';
import './article-content.css';

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
					top: 36,
					right: 18,
					bottom: 36,
					left: 18,
				},
			},
			mediaQueryList: [
				{
					pagesShown: 1,
					listeners: [listenToClickEvents],
					theme: DefaultBookTheme,
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
						animation: new DoublePageBookAnimation(),
					},
				},
			],
		},
		{
			transformers: [new NewlineTransformer()],
			forHTML: true,
		},
		{
			styles: {
				width: '80vw',
				height: '90vh',
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

	const className = `article-content ${config.className}`;
	const renderedHtmlRef = useRef<HTMLDivElement>(null);

	useBook(
		renderedHtmlRef,
		() =>
			showBook
				? createFlexibleBook(article.htmlString, fontFamily)
				: null,
		[article, showBook, fontFamily]
	);

	let youtube: JSX.Element;
	let audio: JSX.Element;
	let video: JSX.Element;

	if (article.video.youtubeUrl) {
		const youtubeConfig = article.video;

		youtube = (
			<YoutubeVideo
				className="youtube-content"
				youtubeUrl={youtubeConfig.youtubeUrl}
				iframeTitle={youtubeConfig.iframeTitle}
			/>
		);
	}

	if (article.audioUrl) {
		audio = (
			<AudioContent
				className="audio-content"
				audioUrl={article.audioUrl}
			/>
		);
	}

	if (article.video.videoUrl) {
		const videoConfig = article.video;

		video = (
			<VideoContent
				className="video-content"
				iframeTitle={videoConfig.iframeTitle}
				videoUrl={videoConfig.videoUrl}
			/>
		);
	}

	return (
		<div className={className}>
			<h1 className="article-header">{article.title}</h1>
			<time className="date-time" dateTime={article.createdAt}>
				{calculateDateString(article.createdAt)}
			</time>
			<div className="divider" />
			{youtube}
			{audio}
			{video}
			<div className="rendered-html" ref={renderedHtmlRef}>
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
