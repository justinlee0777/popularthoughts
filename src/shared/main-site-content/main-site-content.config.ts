import { MainSiteConfig } from '../main-site.config';

export interface MainSiteContentConfig extends Pick<MainSiteConfig, 'article'> {
	className: string;
	fontFamily: string;
}
