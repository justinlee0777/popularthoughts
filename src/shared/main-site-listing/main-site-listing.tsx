import './main-site-listing.css';

import { compareDesc } from 'date-fns';
import { Link } from 'gatsby';
import React from 'react';

import { MainSiteListingConfig } from './main-site-listing.config';
import { addWindowArrowKeyScrollListener } from 'utils/add-window-arrow-key-scroll-listener.function';
import ListingItem from 'shared/listing-item';

export default class MainSiteListing extends React.Component<any, any> {
	private destroyScrollListener: () => void | undefined;
	private entryListingSelector = 'entry-listing';

	constructor(props: MainSiteListingConfig) {
		super(props);

		const searchParams = new URLSearchParams(props.location.search);
		const filterParam = searchParams.get('filter');

		let currentFilter = props.currentFilter;
		if (filterParam) {
			currentFilter = filterParam.split(',');
		}

		this.state = {
			className: props.className,
			currentFilter,
			entries: props.entries,
			filters: props.filters,
		};
	}

	componentDidMount(): void {
		this.destroyScrollListener = addWindowArrowKeyScrollListener(
			`.${this.entryListingSelector}`
		);
	}

	componentWillUnmount(): void {
		this.destroyScrollListener?.();
	}

	render(): JSX.Element {
		const config = this.state;

		let filterCriteria: Set<string> | undefined;
		if (config.currentFilter) {
			filterCriteria = new Set(config.currentFilter);
		}

		const entries = [...config.entries]
			.sort((e1, e2) => {
				return compareDesc(
					new Date(e1.createdAt),
					new Date(e2.createdAt)
				);
			})
			.filter(entry =>
				entry.tags.some(tag => filterCriteria?.has(tag) ?? true)
			);
		const entryElements = entries.map(e => (
			<ListingItem key={e.slug} entry={e} />
		));

		const filterElements = config.filters.map(filter => {
			let filterClass = 'filter';

			if (
				filter.tagCriteria.some(criteria =>
					filterCriteria?.has(criteria)
				)
			) {
				filterClass = `${filterClass} selected`;
			}

			const tagCriteria = filter.tagCriteria;
			const param = `?filter=${tagCriteria.join(',')}`;
			const filterFn = () =>
				this.setState({ currentFilter: tagCriteria });

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

		if (config.currentFilter) {
			const clearFn = () => this.setState({ currentFilter: null });

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
				<div
					className={`${this.entryListingSelector} ${config.className}`}
				>
					{entryElements}
				</div>
			</React.Fragment>
		);
	}
}
