import React from 'react';

import { MainSiteContentConfig } from './main-site-content.config';
import './main-site-content.css';

export default function MainSiteContent(
	config: MainSiteContentConfig
): JSX.Element {
	const className = `main-site-content ${config.className}`;

	return <div className={className}></div>;
}
