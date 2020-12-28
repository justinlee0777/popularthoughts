import { Tab } from './tab.config';

export interface MainSiteConfig {
	children: React.ReactNode | Array<React.ReactNode>;
	tabs: Array<Tab>;
	article: {
		htmlString?: string;
		youtube: {
			youtubeUrl?: string;
			iframeTitle?: string;
		};
	};
}
