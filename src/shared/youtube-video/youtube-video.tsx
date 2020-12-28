import React from 'react';

import { YoutubeVideoConfig } from './youtube-video.config';
import './youtube-video.css';

export default function YoutubeVideo(config: YoutubeVideoConfig): JSX.Element {
	const browserSpecificProps = {
		webkitallowfullscreen: 'true',
		mozallowfullscreen: 'true',
	};

	return (
		<div className={`video-container ${config.className}`}>
			<iframe
				className="video-iframe"
				src={config.youtubeUrl}
				title={config.iframeTitle}
				allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
				frameBorder="0"
				allowFullScreen
				{...browserSpecificProps}
			/>
		</div>
	);
}
