import { desktopStyles, mobileStyles } from 'consts/song-of-the-week-styles';
import { BookConfig, BooksElement } from 'prospero/types';
import {
	listenToClickEvents,
	listenToKeyboardEvents,
} from 'prospero/web/book/listeners';
import { DefaultBookTheme } from 'prospero/web/book/theming';
import { useEffect, useRef } from 'react';
import {
	BookComponent,
	BooksComponent,
	DoublePageBookAnimation,
	LoadingScreenComponent,
	ServerPages,
	SinglePageBookAnimation,
} from 'prospero/web';
import MainSite from 'shared/main-site';
import { Entry } from 'shared/main-site.config';

interface Props {
	entries: Array<Entry>;
}

function createBooksElement(): BooksElement {
	function getBookConfig(bookmarkKey: string): BookConfig {
		return {
			showBookmark: {
				storage: {
					get: () => JSON.parse(localStorage.getItem(bookmarkKey)!),
					save: bookmarkData =>
						localStorage.setItem(
							bookmarkKey,
							JSON.stringify(bookmarkData)
						),
				},
			},
			showPagePicker: true,
			theme: DefaultBookTheme,
			loading: LoadingScreenComponent,
		};
	}

	const endpointBase = 'https://iamjustinlee.com/api/prospero/texts';

	const mobilePages = new ServerPages(
		`${endpointBase}/song-of-the-week-2024/mobile/`
	);

	const desktopPages = new ServerPages(
		`${endpointBase}/song-of-the-week-2024/desktop/`
	);

	const desktopBook = BookComponent(
		{
			getPage: pageNumber => desktopPages.get(pageNumber),
			pageStyles: desktopStyles,
		},
		{
			animation: new DoublePageBookAnimation(),
			listeners: [listenToClickEvents, listenToKeyboardEvents],
			pagesShown: 2,
			media: {
				minWidth: 750,
			},
			tableOfContents: fetch(
				`${endpointBase}/song-of-the-week-2024/table-of-contents/desktop/`
			).then(response => response.json()),
			...getBookConfig('desktop-song-of-the-week-2024-bookmark'),
		},
		{ styles: { margin: 'auto' } }
	);

	const mobileBook = BookComponent(
		{
			getPage: pageNumber => mobilePages.get(pageNumber),
			pageStyles: mobileStyles,
		},
		{
			animation: new SinglePageBookAnimation(),
			listeners: [listenToClickEvents],
			pagesShown: 1,
			tableOfContents: fetch(
				`${endpointBase}/song-of-the-week-2024/table-of-contents/mobile/`
			).then(response => response.json()),
			...getBookConfig('mobile-song-of-the-week-2024-bookmark'),
		},
		{ styles: { margin: 'auto' } }
	);

	return BooksComponent({
		children: [mobileBook, desktopBook],
	});
}

export default function SongOfTheWeek2024Page({ entries }: Props): JSX.Element {
	const bookContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (bookContainerRef.current) {
			bookContainerRef.current.appendChild(createBooksElement());
		}
	}, []);

	return (
		<MainSite
			pageContext={{
				seo: {
					title: 'PopularThoughts Song of the Week 2024',
					description: 'PopularThoughts Song of the Week 2024',
					article: false,
				},
				entries,
				filters: [],
			}}
		>
			<div ref={bookContainerRef}></div>
		</MainSite>
	);
}
