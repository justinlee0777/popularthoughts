import React from 'react';

import YoutubeVideo from '../youtube-video/youtube-video';
import { ArticleContentConfig } from './article-content.config';
import './article-content.css';

export default function ArticleContent(
	config: ArticleContentConfig
): JSX.Element {
	const className = `article-content ${config.className}`;

	let youtube: JSX.Element;

	if (config.article.youtube.youtubeUrl) {
		const youtubeConfig = config.article.youtube;

		youtube = (
			<YoutubeVideo
				className="video-content"
				youtubeUrl={youtubeConfig.youtubeUrl}
				iframeTitle={youtubeConfig.iframeTitle}
			/>
		);
	}

	return (
		<div className={className}>
			{youtube}
			<div
				dangerouslySetInnerHTML={{ __html: config.article.htmlString }}
			/>
		</div>
	);
}
