import MainSite from 'shared/main-site';
import { Entry } from 'shared/main-site.config';

interface Props {
	entries: Array<Entry>;
}

export default function SongOfTheWeek2024Page({ entries }: Props): JSX.Element {
	return (
		<MainSite
			pageContext={{
				seo: {
					title: 'PopularThoughts Song of the Week 2024',
					description: 'PopularThoughts Song of the Week 2024',
					article: false,
				},
				entries,
				filters: [],
			}}
		></MainSite>
	);
}
