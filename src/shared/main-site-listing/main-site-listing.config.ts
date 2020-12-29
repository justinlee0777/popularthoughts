import { MainSiteConfig } from '../main-site.config';

export interface MainSiteListingConfig extends Pick<MainSiteConfig, 'entries'> {
	className?: string;
}
