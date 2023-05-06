import './main-site-listing.css';

import { compareDesc } from 'date-fns';
import { Link } from 'gatsby';
import React, { useEffect, useState } from 'react';

import { MainSiteListingConfig } from './main-site-listing.config';
import { addWindowArrowKeyScrollListener } from 'utils/add-window-arrow-key-scroll-listener.function';
import ListingItem from 'shared/listing-item';

export default function MainSiteListing({
	locationSearch,
	className,
	entries,
	filters,
}: MainSiteListingConfig) {
	const entryListingSelector = 'entry-listing';

	const searchParams = new URLSearchParams(locationSearch);
	const filterParam = searchParams.get('filter');

	const [currentFilter, setCurrentFilter] = useState<Array<string>>(
		filterParam?.split(',') ?? []
	);

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
		const param = `?filter=${tagCriteria.join(',')}`;
		const filterFn = () => setCurrentFilter(tagCriteria);

		return (
			<Link
				className={filterClass}
				key={filter.value}
				to={param}
				onClick={filterFn}
			>
				{filter.label}
			</Link>
		);
	});

	let clearFilters: JSX.Element;

	if (currentFilter.length > 0) {
		const clearFn = () => setCurrentFilter([]);

		clearFilters = (
			<Link className="filter filter-clear" to="/" onClick={clearFn}>
				Clear
			</Link>
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
