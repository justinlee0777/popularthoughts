import styles from './main-site-listing.module.css';

import { compareDesc } from 'date-fns';
import React, { useEffect, useRef, useState } from 'react';

import { MainSiteListingConfig } from './main-site-listing.config';
import { addWindowArrowKeyScrollListener } from '../../utils/add-window-arrow-key-scroll-listener.function';
import ListingItem from '../../shared/listing-item';
import infiniteScroll from '../../utils/infinite-scroll.function';
import classNames from 'classnames';

export default function MainSiteListing({
	className,
	entries,
	filters,
}: MainSiteListingConfig) {
	const entryListingSelector = styles['entry-listing'];
	const initialEntriesShown = 10;

	const listingElementRef = useRef<HTMLDivElement>(null);

	const [currentFilter, setCurrentFilter] = useState<Array<string>>([]);
	const [entriesShown, setEntriesShown] = useState(initialEntriesShown);

	const filterCriteria = new Set(currentFilter);

	useEffect(() => {
		if (listingElementRef) {
			const destroyArrowKeyListener = addWindowArrowKeyScrollListener(
				`.${entryListingSelector}`
			);
			const destroyInfiniteScroll = infiniteScroll(
				listingElementRef.current,
				() =>
					setEntriesShown(
						Math.min(
							entriesShown + initialEntriesShown,
							entries.length
						)
					)
			);

			return () => {
				destroyArrowKeyListener();
				destroyInfiniteScroll();
			};
		}
	});

	const renderedEntries = [...entries]
		.filter(entry =>
			entry.tags.some(
				tag => filterCriteria.size === 0 || filterCriteria.has(tag)
			)
		)
		.sort((e1, e2) => {
			return compareDesc(new Date(e1.createdAt), new Date(e2.createdAt));
		})
		.slice(0, entriesShown);
	const entryElements = renderedEntries.map(e => (
		<ListingItem key={e.slug} entry={e} />
	));

	const filterElements = filters.map(filter => {
		let filterClass = styles['filter'];

		if (filter.tagCriteria.some(criteria => filterCriteria.has(criteria))) {
			filterClass = classNames(filterClass, styles['filter-selected']);
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
			<button
				className={`${styles['filter']} ${styles['filter-clear']}`}
				onClick={clearFn}
			>
				Clear
			</button>
		);
	}

	return (
		<React.Fragment>
			<div className={styles['filters']}>
				<span className={styles['filter-hint']}>Filter: </span>
				{clearFilters}
				{filterElements}
			</div>
			<div
				className={`${entryListingSelector} ${className}`}
				ref={listingElementRef}
			>
				{entryElements}
			</div>
		</React.Fragment>
	);
}
