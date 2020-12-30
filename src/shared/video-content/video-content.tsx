import React from 'react';

import { VideoContentConfig } from './video-content.config';

export default function VideoContent(config: VideoContentConfig): JSX.Element {
	return (
		<video
			className={config.className}
			src={config.videoUrl}
			controls
		></video>
	);
}
