import AboutMeApp from './components/app-about-me';
import ResumeApp from './components/app-resume';
import WormApp from './components/app-worm';
import WebBrowserApp from './containers/web-browser';
import MediaPlayerApp from './components/app-media-player';

import AboutMeIcon from 'static/img/app-icons/about-me.png';
import ResumeIcon from 'static/img/app-icons/resume.png';
import WormIcon from 'static/img/app-icons/w0rm.png';
import WebBrowserIcon from 'static/img/app-icons/browser.gif';
import MediaPlayerIcon from 'static/img/app-icons/media-player.png';

export const AboutMe = {
	name: 'About Me',
	content: AboutMeApp,
	iconSrc: AboutMeIcon,
	isResizable: true,
	width: 530,
	height: 450,
	minWidth: 300,
	minHeight: 200
};

export const WebBrowser = {
	name: 'Internet',
	content: WebBrowserApp,
	iconSrc: WebBrowserIcon,
	isResizable: true,
	width: 600,
	height: 500,
	minWidth: 350,
	minHeight: 230
};

export const Worm = {
	name: 'Worm',
	content: WormApp,
	iconSrc: WormIcon,
	isResizable: false
};

export const Resume = {
	name: 'Resume',
	content: ResumeApp,
	iconSrc: ResumeIcon,
	isResizable: true,
	width: 600,
	height: 800,
	minWidth: 250,
	minHeight: 200
};

export const MediaPlayer = {
	name: 'My Music',
	content: MediaPlayerApp,
	iconSrc: MediaPlayerIcon,
	isResizable: true,
	width: 500,
	height: 400,
	minWidth: 500,
	minHeight: 300
};

export default [
	AboutMe,
	Resume,
	Worm,
	MediaPlayer,
	WebBrowser
];
