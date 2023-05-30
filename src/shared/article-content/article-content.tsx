import React, { useRef } from 'react';
import {
	DefaultBookThemeClassName,
	DoublePageBookPreset,
	FlexibleBookComponent,
	NewlineProcessor,
	SinglePageBookPreset,
} from 'prospero/web';
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
	bookerlyLoaded: boolean
): FlexibleBookElement {
	return FlexibleBookComponent(
		{
			text,
			containerStyle: {
				computedFontFamily: bookerlyLoaded ? 'Bookerly' : 'Arial',
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
				SinglePageBookPreset(),
				{
					pattern: {
						minWidth: 800,
					},
					config: DoublePageBookPreset(),
				},
			],
		},
		{
			bookClassNames: [DefaultBookThemeClassName],
			createProcessors: () => [new NewlineProcessor()],
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
	const { article, showBook, bookerlyLoaded } = config;

	const className = `article-content ${config.className}`;
	const renderedHtmlRef = useRef<HTMLDivElement>(null);

	useBook(
		renderedHtmlRef,
		() =>
			showBook
				? createFlexibleBook(article.htmlString, bookerlyLoaded)
				: null,
		[article, showBook, bookerlyLoaded]
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
