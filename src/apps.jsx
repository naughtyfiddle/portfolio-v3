import AboutMeApp from './components/app-about-me';
import ResumeApp from './components/app-resume';
import WormApp from './components/app-worm';
import WebBrowserApp from './containers/web-browser';

import AboutMeIcon from 'static/img/my-computer.png';
import ResumeIcon from 'static/img/rich-text.png';
import WormIcon from 'static/img/joystick.png';
import WebBrowserIcon from 'static/img/netscape.gif';

const AboutMe = {
	name: 'About Me',
	content: AboutMeApp,
	iconSrc: AboutMeIcon,
	isResizable: true,
	width: 500,
	height: 400,
	minWidth: 250,
	minHeight: 200
};

const WebBrowser = {
	name: 'Internet',
	content: WebBrowserApp,
	iconSrc: WebBrowserIcon,
	isResizable: true,
	width: 500,
	height: 400,
	minWidth: 350,
	minHeight: 230
};

const Worm = {
	name: 'Worm',
	content: WormApp,
	iconSrc: WormIcon,
	isResizable: false
};

const Resume = {
	name: 'Resume',
	content: ResumeApp,
	iconSrc: ResumeIcon,
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
