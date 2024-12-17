import StarIcon from 'shared/star-icon/star-icon';
import styles from './about-page.module.css';

import MainSite from 'shared/main-site';

export default function AboutPage(): JSX.Element {
	return (
		<MainSite
			pageContext={{
				seo: {
					title: 'About PopularThoughts',
					description: 'About PopularThoughts',
					article: false,
				},
				aboutUs: true,
			}}
		>
			<article className={styles.aboutPageContent}>
				<h1>About PopularThoughts</h1>
				<p>
					PopularThoughts are a collection of thoughts on popular
					culture or things.
				</p>
				<p>
					I think all sorts of weird stuff when I'm walking. I
					discovered, in my walks, that I cover the same thoughts with
					the exact same way of thinking coming to the exact same
					conclusion. I thus use this blog to exorcise myself of these
					thoughts and move on to new ones.
				</p>
				<p>
					Some of the writing is about not popular things, like
					literature, though they have some bearing on popular things.
				</p>
				<p>Take none of it seriously.</p>
				<h2>About the rating system</h2>
				<p>Writers change over time. I think so, anyway.</p>
				<p>
					There are things I write that age pretty well. There are
					things I write that age poorly - sometimes a month, even a
					week after writing them.
				</p>
				<p>
					I keep them up to remind myself, "You thought this was a
					good idea once", so as to keep myself honest.
				</p>
				<p>
					But, a bit of selfishness for me, it's also to remind
					myself, "You've put worse stuff on this blog before, it
					doesn't hurt to put more."
				</p>
				<p>
					It's a reminder to you, the reader, that this is me, and a
					reminder to me, who is also a reader, how I have changed
					over time.
				</p>
				<p>
					For your reading pleasure, I have given a rating to each
					article so you know what{' '}
					<i>I think is a good use of your time</i>. Because I'm
					well-aware there are better things you can do with your time
					than to read this blog, you might as well not be annoyed or
					irritated by reading the bad articles.
				</p>
				<p>
					Again, I am also a reader of this blog, so I primarily judge
					based on my own enjoyment of the article, that I myself
					wrote. So take this with a grain of salt.
				</p>
				<p>
					{Array(5)
						.fill(undefined)
						.map((_, i) => (
							<StarIcon key={i} />
						))}
					- I think this is a pretty darn good article that I think
					raises some interesting points. I personally return to it
					sometimes to recall a point I made in it.
				</p>
				<p>
					{Array(4)
						.fill(undefined)
						.map((_, i) => (
							<StarIcon key={i} />
						))}{' '}
					- This is a mostly good article that has a bit of fluff.
				</p>
				<p>
					{Array(3)
						.fill(undefined)
						.map((_, i) => (
							<StarIcon key={i} />
						))}{' '}
					- This article is just me thinking through things. Most
					articles will fall here. Only good if you like the process
					of thinking even if the conclusion is not quite there.
				</p>
				<p>
					{Array(2)
						.fill(undefined)
						.map((_, i) => (
							<StarIcon key={i} />
						))}{' '}
					- This article has very little in facts or empirical
					thinking and is just my gut. Only good as a time capsule.
				</p>
				<p>
					{Array(1)
						.fill(undefined)
						.map((_, i) => (
							<StarIcon key={i} />
						))}{' '}
					- This is literally just rage content and possesses no
					substance. Even I avoid reading these.
				</p>
				<h2>About the writer</h2>
				<p>
					Thomas PopularThoughts was once a cattlehand, a
					spokesperson, a torch singer, a yankee doodle dandy, and an
					alderman once. Now he is the writer of this blog, and an
					astronaut.
				</p>
				<p>
					These are all true and there is no need and no way to
					fact-check any of these statements.
				</p>
				<h2>Contact</h2>
				<p>
					I'm going to level with you, I'm not good at keeping up with
					my emails. But you can contact me at{' '}
					<a href="mailto:popularthoughtsblog@gmail.com">
						popularthoughtsblog@gmail.com
					</a>
					.
				</p>
				<p>
					I also have a{' '}
					<a href="https://bsky.app/profile/popularthoughts.blog">
						BlueSky
					</a>
					.
				</p>
			</article>
		</MainSite>
	);
}
