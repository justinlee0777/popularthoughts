import type {
	PagesAsIndicesOutput,
	TableOfContentsSection,
} from 'prospero/types';

import { capitalize } from 'lodash-es';
import {
	desktopStyles,
	mobileStyles,
} from '../../consts/song-of-the-week-styles';
import workOnChapter from './work-on-chapter';
import loadArticles from 'functions/load-articles.function';

async function load() {
	let articles = await loadArticles();

	articles = articles
		.filter(article => article.display.tags?.includes('song of the week'))
		.sort(
			(a, b) =>
				new Date(a.display.createdAt).getTime() -
				new Date(b.display.createdAt).getTime()
		);

	const responses = await Promise.all(
		articles.map(async article => ({
			...(await workOnChapter({
				mobileStyles,
				desktopStyles,
				text: article.display.contentHtml,
				displayName: article.display.title,
			})),
			chapter: article.display.title,
		}))
	);

	let desktopCompiledText = '';
	let mobileCompiledText = '';

	let mobile: PagesAsIndicesOutput['pages'] = [];
	let mobileIndex = 0;

	let desktop: PagesAsIndicesOutput['pages'] = [];
	let desktopIndex = 0;

	const mobileChapters: Array<TableOfContentsSection> = [],
		desktopChapters: Array<TableOfContentsSection> = [];

	responses.forEach(response => {
		const chapterTitle = response.chapter
			.split('-')
			.map(capitalize)
			.join(' ');

		mobileChapters.push({
			title: chapterTitle,
			pageNumber: mobile.length,
		});
		desktopChapters.push({
			title: chapterTitle,
			pageNumber: desktop.length,
		});

		desktopCompiledText += response.desktop.text;
		mobileCompiledText += response.mobile.text;

		response.mobile.pages.forEach(mobilePage => {
			mobile.push({
				beginIndex: mobileIndex + mobilePage.beginIndex,
				endIndex: mobileIndex + mobilePage.endIndex,
			});
		});

		response.desktop.pages.forEach(desktopPage => {
			desktop.push({
				beginIndex: desktopIndex + desktopPage.beginIndex,
				endIndex: desktopIndex + desktopPage.endIndex,
			});
		});

		mobileIndex += response.mobile.pages.at(-1).endIndex;
		desktopIndex += response.desktop.pages.at(-1).endIndex;
	});

	const mobilePages: PagesAsIndicesOutput & {
		chapters: Array<TableOfContentsSection>;
	} = {
		pages: mobile,
		pageStyles: mobileStyles,
		text: mobileCompiledText,
		chapters: mobileChapters,
	};

	const desktopPages: PagesAsIndicesOutput & {
		chapters: Array<TableOfContentsSection>;
	} = {
		pages: desktop,
		pageStyles: desktopStyles,
		text: desktopCompiledText,
		chapters: desktopChapters,
	};

	const url = 'https://iamjustinlee.com/api';

	try {
		let response = await fetch(
			`${url}/prospero/texts/song-of-the-week-2024/mobile`,
			{
				method: 'PUT',
				body: JSON.stringify(mobilePages),
			}
		);

		console.log(response.status);

		response = await fetch(
			`${url}/prospero/texts/song-of-the-week-2024/desktop`,
			{
				method: 'PUT',
				body: JSON.stringify(desktopPages),
			}
		);

		console.log(response.status);

		process.exit(0);
	} catch (error) {
		console.log(error);

		process.exit(1);
	}
}

if (require.main === module) {
	load()
		.then(() => {
			console.log('success');
			process.exit(0);
		})
		.catch(error => {
			console.log('Error', error);
			process.exit(1);
		});
}
