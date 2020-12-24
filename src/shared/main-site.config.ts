import { Tab } from './tab.config';

export interface MainSiteConfig {
	children: React.ReactNode | Array<React.ReactNode>;
	tabs: Array<Tab>;
}
