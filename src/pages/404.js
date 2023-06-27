import React from 'react';

import './404.css';

export default function errorPage() {
	const whoops = "Whoops! There's no content here.";

	return (
		<div className="content">
			<h1>{whoops}</h1>
			<p>
				Maybe something got moved or is no longer available. In any
				case, you may find it in <a href="./">the homepage</a>.
			</p>
		</div>
	);
}
