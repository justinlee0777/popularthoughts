import { Entry } from 'shared/main-site.config';
import styles from './best-of-page.module.css';

import MainSite from 'shared/main-site';

interface Props {
	entries: Array<Entry>;
}

export default function BestOfPage({ entries }: Props): JSX.Element {
	return (
		<MainSite
			pageContext={{
				seo: {
					title: 'PopularThoughts Best Of Lists',
					description: 'PopularThoughts Best Of Lists',
					article: false,
				},
				entries,
				filters: [],
			}}
		>
			<div className={styles.bestOfPageContent}>
				<p>Who doesn't love a "Best of" list.</p>
				<p>
					I've found that a good way to understand one's tastes is to
					do a simple ranking.
				</p>
				<p>
					Thus I've come to enjoy the surprising results from my own
					lists.
				</p>
				<p>Take nothing absolute from them.</p>
			</div>
		</MainSite>
	);
}
