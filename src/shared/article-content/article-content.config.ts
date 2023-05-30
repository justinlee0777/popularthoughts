import { MainSiteContentConfig } from 'shared/main-site-content/main-site-content.config';

export type ArticleContentConfig = MainSiteContentConfig & {
	showBook: boolean;
};
