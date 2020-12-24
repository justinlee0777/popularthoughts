import { MainSiteConfig } from '../main-site.config';

export interface NavBarConfig extends Pick<MainSiteConfig, 'tabs'> {
	className: string;
}
