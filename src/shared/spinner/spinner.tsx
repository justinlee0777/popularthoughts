import styles from './spinner.module.css';

import classNames from 'classnames';
import React from 'react';

export default function Spinner({
	className,
}: {
	className?: string;
}): JSX.Element {
	const spinnerClassNames = classNames(styles['spinner'], className);

	return <div className={spinnerClassNames}></div>;
}
