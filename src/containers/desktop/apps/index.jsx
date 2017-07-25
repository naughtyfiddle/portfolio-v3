import AboutMeApp from './about-me';
import WormApp from './worm';

const AboutMe = {
	name: 'About Me',
	content: AboutMeApp,
	iconSrc: 'static/img/my-computer.png'
};

const Worm = {
	name: 'Worm',
	content: WormApp,
	iconSrc: 'static/img/joystick.png'
};

export default [
	AboutMe,
	Worm
];
