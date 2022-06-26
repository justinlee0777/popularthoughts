import { compareDesc } from 'date-fns';
import { Link, navigate } from 'gatsby';
import React from 'react';

import { calculateDateString } from 'functions/calculate-date-string';

import { Entry } from '../main-site.config';
import { MainSiteListingConfig } from './main-site-listing.config';
import './main-site-listing.css';

function ListingItem({ entry }: { entry: Entry }): JSX.Element {
	const onClick = () => navigate(entry.slug);

	const tags = entry.tags.map(tag => tag.replace('-', '')).join(', ');

	return (
		<a className="entry" onClick={onClick}>
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

export default class MainSiteListing extends React.Component<any, any> {
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
		const entryElements = entries.map((e, i) => (
			<ListingItem key={i} entry={e} />
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
				<div className={`entry-listing ${config.className}`}>
					{entryElements}
				</div>
			</React.Fragment>
		);
	}
}
