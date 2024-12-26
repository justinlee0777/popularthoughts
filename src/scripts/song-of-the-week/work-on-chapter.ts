import { readFile } from 'node:fs';

import { Pages } from 'prospero/server';
import ChapterWorkerData from './chapter-worker-data.interface';
import PagesAsIndicesOutput from 'prospero/models/pages-as-indices-output.interface';

export default async function workOnChapter({
	mobileStyles,
	desktopStyles,
	text,
	displayName,
}: ChapterWorkerData): Promise<{
	mobile: PagesAsIndicesOutput;
	desktop: PagesAsIndicesOutput;
}> {
	const processors = function () {
		return [];
	};

	console.log(`working on ${displayName}...`);

	const desktop = await new Pages(
		desktopStyles,
		text,
		processors(),
		{}
	).getDataAsIndices();

	const mobile = await new Pages(
		mobileStyles,
		text,
		processors(),
		{}
	).getDataAsIndices();

	console.log(`done with ${displayName}`);

	return {
		mobile,
		desktop,
	};
}
