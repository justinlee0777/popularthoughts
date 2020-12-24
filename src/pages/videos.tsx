import React from 'react';

import MainSite from 'shared/main-site';

export default function Videos(): JSX.Element {
	// Hardcode here for now. Figure out GraphQL afterwards.
	const tabs = [
		{
			label: 'Home',
			value: '/',
		},
		{
			label: 'Videos',
			value: '/videos',
		},
	];

	return <MainSite tabs={tabs}>Hello videos!</MainSite>;
}
