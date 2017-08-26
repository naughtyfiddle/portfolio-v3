import React from 'react';

export default function AboutMe(props) {
	return (
		<div className="about-me-app">
			<h3>
				About <span className="about-me-light">Me</span>
			</h3>
			<div className="about-me-content">
				<p>
					Thanks for checking out my website! My name is Christian Dinh
					and I'm a software engineer living in Austin TX.
					I use a lot of different technologies in my day-to-day life, but this
					particular website is built with:
				</p>
				<ul>
					<li>React</li>
					<li>Redux</li>
					<li>Webpack</li>
					<li>Babel</li>
					<li>Less</li>
				</ul>
				<p>
					And that's about it! Source code can be
					viewed <a href="https://github.com/naughtyfiddle/portfolio-v3">on Github</a>.
				</p>
				<p>
					This site is intended to be fully keyboard and screen-reader accessible.
					Accessibility is great and makes the internet a better place for
					everyone, so if you haven't made your apps accessible you should
					definitely do that!
				</p>
				<p>
					Thanks for reading this far! If you would like to contact me,
					you have a few options:
				</p>
				<ul>
					<li>email</li>
					<li>linkedin</li>
					<li>github</li>
				</ul>
			</div>
		</div>
	);
}
