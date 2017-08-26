import AboutMeApp from './about-me';
import WormApp from './worm';
import WebBrowserApp from '../../web-browser';

const AboutMe = {
	name: 'About Me',
	content: AboutMeApp,
	iconSrc: 'static/img/my-computer.png',
	isResizable: true,
	width: 500,
	height: 400,
	minWidth: 250,
	minHeight: 200
};

const WebBrowser = {
	name: 'Internet',
	content: WebBrowserApp,
	iconSrc: 'static/img/netscape.gif',
	isResizable: true,
	width: 500,
	height: 400,
	minWidth: 350,
	minHeight: 230
};

const Worm = {
	name: 'Worm',
	content: WormApp,
	iconSrc: 'static/img/joystick.png',
	isResizable: false,
	width: 'auto',
	height: 'auto'
};

export default [
	AboutMe,
	WebBrowser,
	Worm
];
