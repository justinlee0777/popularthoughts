import { Tab } from './tab.config';

export interface Entry {
	slug: string;
	title: string;
	createdAt: string;
	articleType: string;
}

export interface SEO {
	title: string;
	description: string;
	article: boolean;
}

export interface MainSiteConfig {
	tabs: Array<Tab>;

	seo: SEO;

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
