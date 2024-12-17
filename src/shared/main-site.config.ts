import { Filter } from './filter.config';

export interface Entry {
	slug: string;
	title: string;
	createdAt: string;
	articleType: string;
	tags: Array<string>;
	rating: number;
}

export interface SEO {
	title: string;
	description: string;
	article: boolean;
}

interface BaseMainSiteConfig {
	seo: SEO;
}

interface AboutUsConfig extends BaseMainSiteConfig {
	aboutUs: true;
}

export interface ArticleConfig extends BaseMainSiteConfig {
	article: {
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
}

export interface ListingConfig extends BaseMainSiteConfig {
	filters: Array<Filter>;
	entries: Array<Entry>;
}

export type MainSiteConfig = AboutUsConfig | ArticleConfig | ListingConfig;
