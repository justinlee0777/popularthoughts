import { PageStyles } from 'prospero/types';

const containerStyles: PageStyles = {
	width: 375,
	height: 667,
	computedFontFamily: 'Arial',
	computedFontSize: '16px',
	lineHeight: 24,
	padding: {
		top: 36,
		right: 24,
		bottom: 36,
		left: 24,
	},
};

export const mobileStyles: PageStyles = {
	...containerStyles,
	computedFontSize: '12px',
};

export const desktopStyles: PageStyles = {
	...containerStyles,
};
