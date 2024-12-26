import { ReactNode } from 'react';
import { ListingConfig } from '../main-site.config';

export interface MainSiteListingConfig extends Omit<ListingConfig, 'seo'> {
	className?: string;
	children?: ReactNode;
}
