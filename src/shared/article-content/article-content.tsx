import React from 'react';

import { calculateDateString } from 'functions/calculate-date-string';

import VideoContent from '../video-content/video-content';
import YoutubeVideo from '../youtube-video/youtube-video';
import { ArticleContentConfig } from './article-content.config';
import './article-content.css';

export default function ArticleContent(
	config: ArticleContentConfig
): JSX.Element {
	const className = `article-content ${config.className}`;

	let youtube: JSX.Element;
	let video: JSX.Element;

	if (config.article.video.youtubeUrl) {
		const youtubeConfig = config.article.video;

		youtube = (
			<YoutubeVideo
				className="youtube-content"
				youtubeUrl={youtubeConfig.youtubeUrl}
				iframeTitle={youtubeConfig.iframeTitle}
			/>
		);
	}

	if (config.article.video.videoUrl) {
		const videoConfig = config.article.video;

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
			<h1>{config.article.title}</h1>
			<time className="date-time" dateTime={config.article.createdAt}>
				{calculateDateString(config.article.createdAt)}
			</time>
			<div className="divider" />
			{youtube}
			{video}
			<div
				className="rendered-html"
				dangerouslySetInnerHTML={{ __html: config.article.htmlString }}
			/>
		</div>
	);
}
