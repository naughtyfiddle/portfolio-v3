import AboutMeApp from './about-me';
import WormApp from './worm';
import WebBrowserApp from '../../web-browser';

const AboutMe = {
	name: 'About Me',
	content: AboutMeApp,
	iconSrc: 'static/img/my-computer.png'
};

const WebBrowser = {
	name: 'Internet',
	content: WebBrowserApp,
	iconSrc: 'static/img/netscape.gif'
};

const Worm = {
	name: 'Worm',
	content: WormApp,
	iconSrc: 'static/img/joystick.png'
};

export default [
	AboutMe,
	WebBrowser,
	Worm
];
