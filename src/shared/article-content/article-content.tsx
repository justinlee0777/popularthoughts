import React from 'react';

import { ArticleContentConfig } from './article-content.config';

export default function Articleontent(
	config: ArticleContentConfig
): JSX.Element {
	const className = `article-content ${config.className}`;

	return (
		<div
			className={className}
			dangerouslySetInnerHTML={{ __html: config.article }}
		/>
	);
}
