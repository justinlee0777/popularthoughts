import styles from './listing-style.module.css';

import React from 'react';
import { Tooltip } from 'react-tooltip';

import { calculateDateString } from '../../functions/calculate-date-string';
import { Entry } from '../../shared/main-site.config';
import StarIcon from 'shared/star-icon/star-icon';

export default function ListingItem({ entry }: { entry: Entry }): JSX.Element {
	const tags = entry.tags.map(tag => tag.replace('-', '')).join(', ');

	const { rating } = entry;

	let tooltipText: string;

	switch (rating) {
		case 5:
			tooltipText = 'solid';
			break;
		case 4:
			tooltipText = 'okay';
			break;
		case 3:
			tooltipText = 'skippable';
			break;
		case 2:
			tooltipText = `not worth it`;
			break;
		case 1:
			tooltipText = `don't`;
		default:
	}

	const tooltipId = `${encodeURIComponent(entry.title)}Tooltip`;

	return (
		<a className={styles['entry']} href={`/${entry.slug}`}>
			<Tooltip id={tooltipId} />
			<span className={styles.row}>
				<strong className={styles['entry-title']}>{entry.title}</strong>
				<i className={styles['article-type']}>{tags}</i>
			</span>
			<div className={styles.row}>
				<time dateTime={entry.createdAt}>
					{calculateDateString(entry.createdAt)}
				</time>
				{entry.rating && (
					<span
						className={styles.rating}
						data-tooltip-id={tooltipId}
						data-tooltip-content={tooltipText}
					>
						{Array(entry.rating)
							.fill(undefined)
							.map((_, i) => (
								<StarIcon key={i} />
							))}
					</span>
				)}
			</div>
		</a>
	);
}
