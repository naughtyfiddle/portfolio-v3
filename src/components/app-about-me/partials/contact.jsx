import React from 'react';

export default function Contact(props) {
	return (
		<div>
			Thanks for reading this far! If you would like to contact me, you have a few options:
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
			Be warned that contacting me through linkedin is the best way to never get a response,
			yet for some reason I feel compelled to put it here anyway.
		</div>
	);
}
