import styles from '../main-site-listing/main-site-listing.module.css';

import React from 'react';

import { calculateDateString } from '../../functions/calculate-date-string';
import { Entry } from '../../shared/main-site.config';

export default function ListingItem({ entry }: { entry: Entry }): JSX.Element {
	const tags = entry.tags.map(tag => tag.replace('-', '')).join(', ');

	return (
		<a className={styles['entry']} href={entry.slug}>
			<span>
				<strong className={styles['entry-title']}>{entry.title}</strong>
				<i className={styles['article-type']}>{tags}</i>
			</span>
			<time dateTime={entry.createdAt}>
				{calculateDateString(entry.createdAt)}
			</time>
		</a>
	);
}
