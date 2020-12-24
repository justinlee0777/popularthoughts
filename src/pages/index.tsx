import React from 'react';

import MainSite from 'shared/main-site';

export default function Home(): JSX.Element {
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

	return <MainSite tabs={tabs}>Hello world!</MainSite>;
}
