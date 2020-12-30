import { Tab } from './tab.config';

export interface Entry {
	slug: string;
	title: string;
}

export interface MainSiteConfig {
	tabs: Array<Tab>;

	article?: {
		htmlString?: string;
		video: {
			videoUrl?: string;
			youtubeUrl?: string;
			iframeTitle?: string;
		};
	};

	entries?: Array<Entry>;
}
