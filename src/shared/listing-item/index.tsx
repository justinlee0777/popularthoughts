import React from 'react';

import { calculateDateString } from 'functions/calculate-date-string';
import { Entry } from 'shared/main-site.config';

export default function ListingItem({ entry }: { entry: Entry }): JSX.Element {
	const tags = entry.tags.map(tag => tag.replace('-', '')).join(', ');

	return (
		<a className="entry" href={entry.slug}>
			<span>
				<strong className="entry-title">{entry.title}</strong>
				<i className="article-type">{tags}</i>
			</span>
			<time dateTime={entry.createdAt}>
				{calculateDateString(entry.createdAt)}
			</time>
		</a>
	);
}
