import styles from './main-site-listing.module.css';

import { compareDesc } from 'date-fns';
import React, { ReactNode, useEffect, useRef, useState } from 'react';

import { MainSiteListingConfig } from './main-site-listing.config';
import { addWindowArrowKeyScrollListener } from '../../utils/add-window-arrow-key-scroll-listener.function';
import ListingItem from '../../shared/listing-item';
import infiniteScroll from '../../utils/infinite-scroll.function';
import { MdFilterList } from 'react-icons/md';
import FilterPane from 'shared/filter-pane/filter-pane';
import { Filter } from 'shared/filter.config';

export default function MainSiteListing({
	className,
	entries,
	filters,
	children,
}: MainSiteListingConfig) {
	const entryListingSelector = styles['entry-listing'];
	const initialEntriesShown = 10;

	const listingElementRef = useRef<HTMLDivElement>(null);

	const [filter, setFilter] = useState<Filter | null>(null);
	const [search, setSearch] = useState<string | null>(null);
	const [entriesShown, setEntriesShown] = useState(initialEntriesShown);
	const [filterOpened, setFilterOpened] = useState(false);

	const tagCriteria = filter?.tagCriteria ?? [];

	const filterCriteria = new Set(tagCriteria);

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

	let renderedEntries = [...entries];

	if (search) {
		renderedEntries = renderedEntries.filter(entry =>
			entry.title.match(new RegExp(search, 'i'))
		);
	}

	renderedEntries = renderedEntries
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

	let filterTextElement: ReactNode;

	if (search || tagCriteria.length > 0) {
		const filterTexts: Array<string> = [];

		if (search) {
			filterTexts.push(`"${search}"`);
		}

		if (tagCriteria.length > 0) {
			filterTexts.push(`${tagCriteria.join(', ')} categories`);
		}

		filterTextElement = <span>Filter by: {filterTexts.join(' and ')}</span>;
	}

	return (
		<React.Fragment>
			<button
				className={styles.filter}
				onClick={() => setFilterOpened(prev => !prev)}
			>
				{filterTextElement}
				<MdFilterList />
			</button>

			<div
				className={`${entryListingSelector} ${className}`}
				ref={listingElementRef}
			>
				{children}
				{entryElements}
			</div>
			{filterOpened && (
				<FilterPane
					currentFilter={{
						filter,
						search,
					}}
					filters={filters}
					onFilterClose={() => setFilterOpened(false)}
					onFilterChange={({ filter, search }) => {
						setFilter(filter);
						setSearch(search);
					}}
				/>
			)}
		</React.Fragment>
	);
}
