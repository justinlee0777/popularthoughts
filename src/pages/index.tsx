import React from 'react';

import NavBar from 'shared/nav-bar/nav-bar';

import './index.css';

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

  return (
    <div className="home">
      <NavBar tabs={tabs}></NavBar>
      Hello world!
    </div>
  );
}
