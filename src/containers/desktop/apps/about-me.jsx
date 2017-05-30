import React from 'react';

export default function AboutMe(props) {
	return (
		<div className="about-me-app">
			<p>
				Thanks for checking out my website! My name is Christian Dinh.
				I'm a full-stack software engineer with a propensity for the front end.
				I use a lot of different technologies in my day-to-day life, but this website
				in particular is built with:
			</p>
			<ul>
				<li>React</li>
				<li>Redux</li>
				<li>Webpack</li>
				<li>Babel</li>
				<li>Less</li>
			</ul>
			<p>
				And that's about it! No back end in this case, the whole site is
				hosted via github pages. Unsurprisingly, source code can be viewed at
				<a href="https://github.com/naughtyfiddle/portfolio-v3">this site's github repository</a>.
			</p>
			<p>
				I am also reasonably well-versed in accessibility techniques. You might
				notice that this site is fully keyboard and screen-reader accessible, and
				that is quite on purpose. Accessibility is great and makes the internet a
				better place for everyone, so if you haven't made your apps accessible
				you should definitely do that!
			</p>
			<p>
				Thanks for reading, that's all I have to say! If you would like to contact me,
				you've got a few options:
			</p>
			<ul>
				<li>email</li>
				<li>linkedin</li>
				<li>github</li>
			</ul>
			<p>
				Enjoy your stay, I hope you have as much fun visiting this site as I had making it :D
			</p>
		</div>
	);
}
