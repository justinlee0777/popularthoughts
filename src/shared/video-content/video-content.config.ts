import { MainSiteConfig } from '../main-site.config';

export interface VideoContentConfig {
	className: string;
	iframeTitle: MainSiteConfig['article']['video']['iframeTitle'];
	videoUrl: MainSiteConfig['article']['video']['videoUrl'];
}
