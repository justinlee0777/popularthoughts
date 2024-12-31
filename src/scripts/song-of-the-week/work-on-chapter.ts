import { Pages } from 'prospero/server';
import { JSDOM } from 'jsdom';
import ChapterWorkerData from './chapter-worker-data.interface';
import PagesAsIndicesOutput from 'prospero/models/pages-as-indices-output.interface';
import { Transformer } from 'prospero/types';

export default async function workOnChapter({
	mobileStyles,
	desktopStyles,
	text,
	displayName,
}: ChapterWorkerData): Promise<{
	mobile: PagesAsIndicesOutput;
	desktop: PagesAsIndicesOutput;
}> {
	const dom = new JSDOM(text);

	dom.window.document.body.firstChild.remove();

	text = dom.window.document.body.innerHTML;

	const processors: () => Array<Transformer> = function () {
		return [
			{
				transform: text => {
					return text.replaceAll(/(<.+>)\n+/g, '$1');
				},
			},
		];
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
