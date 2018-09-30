import AboutMeApp from './components/app-about-me';
import ResumeApp from './components/app-resume';
import WormApp from './components/app-worm';
import WebBrowserApp from './containers/web-browser';

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
	isResizable: false
};

const Resume = {
	name: 'Resume',
	content: ResumeApp,
	iconSrc: 'static/img/rich-text.png',
	isResizable: true,
	width: 600,
	height: 800,
	minWidth: 250,
	minHeight: 200
};

export default [
	AboutMe,
	WebBrowser,
	Worm,
	Resume
];
