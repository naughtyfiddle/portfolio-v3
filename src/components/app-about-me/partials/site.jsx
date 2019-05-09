import React from 'react';

export default function Site(props) {
	return (
		<div>
			I use a lot of different technologies in my day-to-day life, but this website is built with:
			<ul>
				<li>React</li>
				<li>Redux</li>
				<li>Webpack</li>
				<li>Babel</li>
			</ul>
			And that's about it! Source code can be
			viewed on <a href="https://github.com/bass-dandy/portfolio-v3" target="blank">this site's Github repo</a>.
			<p>
				This site is intended to be keyboard and screen-reader accessible,
				though its design inherently presents a few challenges. Nonetheless,
				accessibility is great and makes the internet a better place for everyone!
				If you haven't made your apps accessible you should definitely consider it.
			</p>
		</div>
	);
}
