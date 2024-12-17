import { ArticleConfig } from '../main-site.config';

export interface MainSiteContentConfig extends Omit<ArticleConfig, 'seo'> {
	className: string;
	fontFamily: string;
}
