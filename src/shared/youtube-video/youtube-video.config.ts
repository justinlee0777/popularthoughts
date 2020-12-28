import { MainSiteConfig } from '../main-site.config';

export interface YoutubeVideoConfig {
	className: string;
	iframeTitle: MainSiteConfig['article']['youtube']['iframeTitle'];
	youtubeUrl: MainSiteConfig['article']['youtube']['youtubeUrl'];
}
