import styles from './filter-pane.module.css';

import clsx from 'clsx';
import { useState } from 'react';
import { MdClose } from 'react-icons/md';

import { Filter } from 'shared/filter.config';

interface FilterConfig {
	filter: Filter | null;
	search: string | null;
}

interface Props {
	currentFilter: FilterConfig;
	filters: Array<Filter>;

	onFilterClose?: () => void;
	onFilterChange?: (filter: FilterConfig) => void;
	className?: string;
}

export default function FilterPane({
	currentFilter,
	className,
	filters,
	onFilterClose,
	onFilterChange,
}: Props): JSX.Element {
	const { filter, search } = currentFilter;

	const tagCriteria = filter?.tagCriteria ?? [];

	const filterCriteria = new Set(tagCriteria);

	const filterElements = filters.map(filter => {
		let filterClass = styles['filter'];

		if (filter.tagCriteria.some(criteria => filterCriteria.has(criteria))) {
			filterClass = clsx(filterClass, styles['filter-selected']);
		}

		return (
			<button
				className={filterClass}
				key={filter.value}
				onClick={() => {
					let newFilter;

					if (
						filter.tagCriteria.every(criteria =>
							tagCriteria.find(c => c === criteria)
						)
					) {
						newFilter = null;
					} else {
						newFilter = filter;
					}

					onFilterChange?.({
						filter: newFilter,
						search,
					});
				}}
			>
				{filter.label}
			</button>
		);
	});

	const searchInputId = 'filterSearch';

	return (
		<div className={styles.filterBackdrop} onClick={onFilterClose}>
			<div
				className={clsx(className, styles.filterPane)}
				onClick={event => event.stopPropagation()}
			>
				<h3 className={styles.filterHeader}>
					Filters{' '}
					<button
						className={styles.filterClose}
						onClick={onFilterClose}
					>
						<MdClose />
					</button>
				</h3>
				<button
					className={`${styles['filter']} ${styles['filter-clear']}`}
					onClick={() => {
						onFilterChange?.({
							filter: null,
							search: null,
						});
					}}
				>
					Clear
				</button>
				<div className={styles.filters}>{filterElements}</div>
				<label htmlFor={searchInputId}>Search</label>
				<input
					id={searchInputId}
					type="text"
					value={search ?? ''}
					onChange={event => {
						const value = event.target.value;
						let newSearch;

						if (value) {
							newSearch = value;
						} else {
							newSearch = null;
						}

						onFilterChange?.({
							filter,
							search: newSearch,
						});
					}}
				/>
			</div>
		</div>
	);
}
