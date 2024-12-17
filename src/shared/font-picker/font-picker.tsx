import styles from './font-picker.module.css';

import React from 'react';

import FontPickerConfig from './font-picker.config';
import clsx from 'clsx';

export default function FontPicker({
	fonts,
	selectedFont,
	className,
	onFontSelect,
	children,
}: FontPickerConfig): JSX.Element {
	return (
		<fieldset className={clsx(styles['font-picker'], className)}>
			<legend>Fonts</legend>
			{fonts.map(font => {
				const radioId = `radio-${font.family};`;

				return (
					<div
						className={styles['font-picker-item']}
						key={font.family}
					>
						<input
							type="radio"
							id={radioId}
							value={font.family}
							checked={font.family === selectedFont}
							onChange={() => onFontSelect?.(font)}
						/>
						<label htmlFor={radioId}>{font.family}</label>
					</div>
				);
			})}
			{children}
		</fieldset>
	);
}
