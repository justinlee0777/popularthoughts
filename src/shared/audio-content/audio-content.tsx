import React from 'react';

import { AudioContentConfig } from './audio-content.config';

export default function VideoContent(config: AudioContentConfig): JSX.Element {
	return (
		<audio
			className={config.className}
			controls
			src={config.audioUrl}
		></audio>
	);
}
