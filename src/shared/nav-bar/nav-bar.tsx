import { useMemo } from 'react';
import styles from './nav-bar.module.css';

interface NavBarItem {
	text: string;
	url: string;
}

export default function NavBar(): JSX.Element {
	const items: Array<NavBarItem> = useMemo(
		() => [
			{
				text: 'About',
				url: '/about',
			},
			{
				url: '/song-of-the-week-2024',
				text: 'Song of the Week 2024',
			},
			{
				text: 'Best of lists',
				url: '/best-of',
			},
		],
		[]
	);

	return (
		<div className={styles.navbar}>
			<a href="/" className={styles.description}>
				Thoughts on popular culture.
			</a>
			{items.map(({ url, text }) => (
				<a key={url} href={url}>
					{text}
				</a>
			))}
		</div>
	);
}
