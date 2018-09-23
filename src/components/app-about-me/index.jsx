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
					viewed on <a href="https://github.com/bass-dandy/portfolio-v3" target="blank">this site's Github repo</a>.
				</p>
				<p>
					This site is intended to be fully keyboard and screen-reader accessible.
					Accessibility is great and makes the internet a better place for
					everyone, so if you haven't made your apps accessible you should
					definitely do that! Perhaps I could even help ;)
				</p>
				<p>
					Thanks for reading this far! If you would like to contact me,
					you have a few options:
				</p>
				<ul>
					<li>
						<a href="mailto:christian.t.dinh@gmail.com">
							christian.t.dinh@gmail.com
						</a>
					</li>
					<li>
						<a
							href="https://www.linkedin.com/in/christiandinh/"
							target="blank"
						>
							my Linkedin profile
						</a>
					</li>
					<li>
						<a
							href="https://github.com/bass-dandy"
							target="blank"
						>
							my Github profile
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
}
