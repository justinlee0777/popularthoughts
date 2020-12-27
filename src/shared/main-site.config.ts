import { Tab } from './tab.config';

export interface MainSiteConfig {
	article: string;
	children: React.ReactNode | Array<React.ReactNode>;
	tabs: Array<Tab>;
}
