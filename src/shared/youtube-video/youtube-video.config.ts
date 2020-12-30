import { MainSiteConfig } from '../main-site.config';

export interface YoutubeVideoConfig {
	className: string;
	iframeTitle: MainSiteConfig['article']['video']['iframeTitle'];
	youtubeUrl: MainSiteConfig['article']['video']['youtubeUrl'];
}
