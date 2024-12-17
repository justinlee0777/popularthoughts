import clsx from 'clsx';
import styles from './spinner.module.css';

import React from 'react';

export default function Spinner({
	className,
}: {
	className?: string;
}): JSX.Element {
	const spinnerClassNames = clsx(styles['spinner'], className);

	return <div className={spinnerClassNames}></div>;
}
