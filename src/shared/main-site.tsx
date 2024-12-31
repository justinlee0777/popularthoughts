import styles from './main-site.module.css';

import React, { ReactNode, useEffect, useMemo, useState } from 'react';

import downloadFont from '../functions/load-font.function';
import MainSiteContent from './main-site-content/main-site-content';
import MainSiteListing from './main-site-listing/main-site-listing';
import { MainSiteConfig, SEO } from './main-site.config';
import SEOComponent from './seo';
import FontPicker from './font-picker/font-picker';
import Font from './font-picker/font.model';
import Spinner from './spinner/spinner';
import NavBar from './nav-bar/nav-bar';

function createSEO(seo: SEO): JSX.Element {
	return (
		<SEOComponent
			title={seo.title}
			description={seo.description}
			article={seo.article}
		/>
	);
}

export default function MainSite({
	pageContext,
	children,
	hideFontPicker,
}: {
	pageContext: MainSiteConfig;
	children?: ReactNode | Array<ReactNode>;
	hideFontPicker?: boolean;
}): JSX.Element {
	const fontStorageKey = useMemo(() => 'saved-font', []);
	const fonts = useMemo(
		() => [
			{
				family: 'Arial',
			},
			{
				family: 'Bookerly',
				url: '/Bookerly-Regular.ttf',
			},
			{
				family: 'EB Garamond',
				url:
					'https://fonts.gstatic.com/s/ebgaramond/v26/SlGDmQSNjdsmc35JDF1K5E55YMjF_7DPuGi-6_RkBI9_WamXgHlI.woff2',
			},
			{
				family: 'Helvetica',
			},
			{
				family: 'Roboto',
				url:
					'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu7mxKKTU1Kvnz.woff2',
			},
			{
				family: 'Times New Roman',
			},
		],
		[]
	);

	const [font, setFont] = useState<Font>(fonts[0]);

	const [fontLoading, setFontLoading] = useState(false);

	const loadFont = useMemo(
		() => async (selectedFont: Font) => {
			if (selectedFont.url) {
				try {
					setFontLoading(true);

					await downloadFont(
						selectedFont.family,
						selectedFont.url,
						selectedFont.descriptors
					);
				} finally {
					setFontLoading(false);
					setFont(selectedFont);
					localStorage.setItem(fontStorageKey, selectedFont.family);
				}
			} else {
				setFont(selectedFont);
				localStorage.setItem(fontStorageKey, selectedFont.family);
			}
		},
		[]
	);

	useEffect(() => {
		const fontFamily = localStorage.getItem(fontStorageKey);

		const savedFont =
			fonts.find(font => font.family === fontFamily) ?? fonts[0];

		loadFont(savedFont);
	}, [fonts]);

	let content: JSX.Element;

	if ('aboutUs' in pageContext) {
		content = <>{children}</>;
	} else if ('article' in pageContext) {
		content = (
			<MainSiteContent
				className={styles['content']}
				fontFamily={font.family}
				article={pageContext.article}
			></MainSiteContent>
		);
	} else if ('entries' in pageContext) {
		content = (
			<>
				<MainSiteListing
					className={styles['main-site-listing']}
					entries={pageContext.entries}
					filters={pageContext.filters}
				>
					{children}
				</MainSiteListing>
			</>
		);
	}

	const seo = createSEO(pageContext.seo);

	return (
		<div
			className={styles['main-site']}
			lang="en-US"
			style={{ fontFamily: font.family }}
		>
			{seo}
			<NavBar />
			{!hideFontPicker && (
				<FontPicker
					className={styles.fontPicker}
					fonts={fonts}
					selectedFont={font.family}
					onFontSelect={loadFont}
				>
					{fontLoading && <Spinner className="font-picker-spinner" />}
				</FontPicker>
			)}
			{content}
		</div>
	);
}
