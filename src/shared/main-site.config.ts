import { Filter } from './filter.config';

export interface Entry {
	slug: string;
	title: string;
	createdAt: string;
	articleType: string;
	tags: Array<string>;
}

export interface SEO {
	title: string;
	description: string;
	article: boolean;
}

export interface MainSiteConfig {
	seo: SEO;
	filters?: Array<Filter>;

	article?: {
		title: string;
		createdAt: string;
		htmlString?: string;
		audioUrl?: string;
		video?: {
			videoUrl?: string;
			youtubeUrl?: string;
			iframeTitle?: string;
		};
	};

	entries?: Array<Entry>;
}
