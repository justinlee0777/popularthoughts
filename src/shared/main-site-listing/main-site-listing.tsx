import { compareDesc } from 'date-fns';
import { navigate } from 'gatsby';
import React from 'react';

import { calculateDateString } from 'functions/calculate-date-string';

import { Entry } from '../main-site.config';
import { MainSiteListingConfig } from './main-site-listing.config';
import './main-site-listing.css';

function ListingItem({ entry }: { entry: Entry }): JSX.Element {
	const onClick = () => navigate(entry.slug);

	return (
		<a className="entry" onClick={onClick}>
			<span>
				<strong className="entry-title">{entry.title}</strong>
				<i className="article-type">{entry.articleType}</i>
			</span>
			<time dateTime={entry.createdAt}>
				{calculateDateString(entry.createdAt)}
			</time>
		</a>
	);
}

export default function MainSiteListing(
	config: MainSiteListingConfig
): JSX.Element {
	const entries = [...config.entries].sort((e1, e2) => {
		return compareDesc(new Date(e1.createdAt), new Date(e2.createdAt));
	});
	const entryElements = entries.map((e, i) => (
		<ListingItem key={i} entry={e} />
	));

	return (
		<div className={`entry-listing ${config.className}`}>
			{entryElements}
		</div>
	);
}
