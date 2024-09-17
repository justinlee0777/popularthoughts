import { Filter } from '../../shared/filter.config';

import { MainSiteConfig } from '../main-site.config';

export interface MainSiteListingConfig extends Pick<MainSiteConfig, 'entries'> {
	filters: Array<Filter>;
	className?: string;
}
