import './main-site-listing.css';

import { compareDesc } from 'date-fns';
import React, { useEffect, useState } from 'react';

import { MainSiteListingConfig } from './main-site-listing.config';
import { addWindowArrowKeyScrollListener } from 'utils/add-window-arrow-key-scroll-listener.function';
import ListingItem from 'shared/listing-item';

export default function MainSiteListing({
	className,
	entries,
	filters,
}: MainSiteListingConfig) {
	const entryListingSelector = 'entry-listing';

	const [currentFilter, setCurrentFilter] = useState<Array<string>>([]);

	const filterCriteria = new Set(currentFilter);

	useEffect(() => {
		return addWindowArrowKeyScrollListener(`.${entryListingSelector}`);
	});

	const renderedEntries = [...entries]
		.filter(entry =>
			entry.tags.some(
				tag => filterCriteria.size === 0 || filterCriteria.has(tag)
			)
		)
		.sort((e1, e2) => {
			return compareDesc(new Date(e1.createdAt), new Date(e2.createdAt));
		});
	const entryElements = renderedEntries.map(e => (
		<ListingItem key={e.slug} entry={e} />
	));

	const filterElements = filters.map(filter => {
		let filterClass = 'filter';

		if (filter.tagCriteria.some(criteria => filterCriteria.has(criteria))) {
			filterClass = `${filterClass} selected`;
		}

		const tagCriteria = filter.tagCriteria;
		const filterFn = () => setCurrentFilter(tagCriteria);

		return (
			<button
				className={filterClass}
				key={filter.value}
				onClick={filterFn}
			>
				{filter.label}
			</button>
		);
	});

	let clearFilters: JSX.Element;

	if (currentFilter.length > 0) {
		const clearFn = () => setCurrentFilter([]);

		clearFilters = (
			<button className="filter filter-clear" onClick={clearFn}>
				Clear
			</button>
		);
	}

	return (
		<React.Fragment>
			<div className="filters">
				<span className="filter-hint">Filter: </span>
				{clearFilters}
				{filterElements}
			</div>
			<div className={`${entryListingSelector} ${className}`}>
				{entryElements}
			</div>
		</React.Fragment>
	);
}
