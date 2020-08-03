import React from 'react';
import {useDispatch} from 'react-redux';

import {launchApp} from 'src/redux/windows';
import {Resume, Projects, MediaPlayer} from 'src/apps';

import headshotSrc from 'static/img/about-me/headshot.png';
import styles from './me.module.css';

function AppLink({children, app}) {
	const dispatch = useDispatch();

	return (
		<button
			className={styles.appLink}
			onClick={() => dispatch(launchApp(app))}
		>
			{children}
		</button>
	);
}

export default function Me() {
	return (
		<>
			<img
				src={headshotSrc}
				alt="photo of some nerd (me)"
				className={styles.headshot}
			/>
			<p className={styles.paragraph}>
				Thanks for checking out my website! My name is Christian Dinh and I'm a software engineer
				living in NYC. Most of my experience is in front end web dev, but I probably wouldn't
				mind the opportunity to branch out a bit. If you're interested in a more detailed description
				of my experience take a look at <AppLink app={Resume}>my resume</AppLink>, and if you're
				interested in examples of my work take a look at <AppLink app={Projects}>my projects</AppLink> :D
			</p>
			<p className={styles.paragraph}>
				Outside of programming, I {'<3'} music! I play a few instruments (bass is my fav),
				compose chiptune music on my gameboy, and go to a lot of live shows (when I'm not living
				through a pandemic). Some of <AppLink app={MediaPlayer}>my music</AppLink> is hosted on
				this website. Some other things I think are dope: movies, Magic: The Gathering (mostly EDH and
				proxy vintage), video games, snowboarding, cooking, cocktails, and long walks on the beach.
			</p>
		</>
	);
}
