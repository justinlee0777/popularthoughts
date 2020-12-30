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
			<strong className="entry-title">{entry.title}</strong>
			<time dateTime={entry.createdAt}>
				{calculateDateString(entry.createdAt)}
			</time>
		</a>
	);
}

export default function MainSiteListing(
	config: MainSiteListingConfig
): JSX.Element {
	const entryElements = config.entries.map((e, i) => (
		<ListingItem key={i} entry={e} />
	));

	return (
		<div className={`entry-listing ${config.className}`}>
			{entryElements}
		</div>
	);
}
