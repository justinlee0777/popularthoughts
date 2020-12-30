import { Tab } from './tab.config';

export interface Entry {
	slug: string;
	title: string;
	createdAt: string;
}

export interface MainSiteConfig {
	tabs: Array<Tab>;

	article?: {
		title: string;
		createdAt: string;
		htmlString?: string;
		video: {
			videoUrl?: string;
			youtubeUrl?: string;
			iframeTitle?: string;
		};
	};

	entries?: Array<Entry>;
}
