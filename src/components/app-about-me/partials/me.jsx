import React from 'react';
import {connect} from 'react-redux';

import {launchApp} from 'src/redux/windows';
import {Resume} from 'src/apps';

import headshotSrc from 'static/img/headshot.png';
import styles from './me.module.css';

function Me(props) {
	const myResume = (
		<button
			className={styles.openResume}
			onClick={() => props.launchApp(Resume)}
		>
			my resume
		</button>
	);

	const musicILike = (
		<a href="https://www.youtube.com/watch?v=eDzBpQ0GcoU" target="blank">
			music I like
		</a>
	);

	return (
		<>
			<img
				src={headshotSrc}
				alt="photo of some nerd"
				className={styles.headshot}
			/>
			<p className={styles.paragraph}>
				Thanks for checking out my website! My name is Christian Dinh and I'm
				a software engineer living in Austin TX. Most of my experience is in front
				end web dev, but I probably wouldn't mind the opportunity to branch out a bit.
				If you're interested in a more detailed description of my skills, take a look at {myResume} :D
			</p>
			<p className={styles.paragraph}>
				Outside of programming, I {'<3'} music! I play a few instruments (bass is my fav)
				and go to a lot of live shows. Some of the {musicILike} is objectively unlistenable,
				but we all have our flaws. Some other things I think are dope:
				movies, Magic: The Gathering (mostly EDH and proxy vintage), video games, snowboarding,
				cooking, cocktails, and long walks on the beach.
			</p>
		</>
	);
}

const mapDispatchToProps = {
	launchApp
};

export default connect(null, mapDispatchToProps)(Me);
