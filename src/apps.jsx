import AboutMeApp from './components/app-about-me';
import ResumeApp from './components/app-resume';
import WormApp from './components/app-worm';
import WebBrowserApp from './components/app-web-browser';
import MediaPlayerApp from './components/app-media-player';

import AboutMeIcon from 'static/img/app-icons/about-me.png';
import ResumeIcon from 'static/img/app-icons/resume.png';
import WormIcon from 'static/img/app-icons/w0rm.png';
import WebBrowserIcon from 'static/img/app-icons/browser.png';
import MediaPlayerIcon from 'static/img/app-icons/media-player.png';
import FolderIcon from 'static/img/app-icons/folder.png';
import LinkIcon from 'static/img/app-icons/link.png';

export const AboutMe = {
	name: 'About Me',
	content: AboutMeApp,
	iconSrc: AboutMeIcon,
	width: 530,
	height: 450,
	minWidth: 300,
	minHeight: 200
};

export const WebBrowser = {
	name: 'Internet',
	content: WebBrowserApp,
	iconSrc: WebBrowserIcon,
	width: 800,
	height: 600,
	minWidth: 350,
	minHeight: 230
};

export const Worm = {
	name: 'Worm',
	content: WormApp,
	iconSrc: WormIcon,
	resizeDisabled: true
};

export const Resume = {
	name: 'Resume',
	content: ResumeApp,
	iconSrc: ResumeIcon,
	width: 600,
	height: 800,
	minWidth: 250,
	minHeight: 200
};

export const MediaPlayer = {
	name: 'My Music',
	content: MediaPlayerApp,
	iconSrc: MediaPlayerIcon,
	width: 500,
	height: 400,
	minWidth: 500,
	minHeight: 300
};

export const Planechase = {
	name: 'Planechase',
	url: 'https://teysa-envoy-of-g.host',
	iconSrc: LinkIcon
};

export const PizzaDashPizzaDotPizza = {
	name: 'Pizza Dash Pizza Dot Pizza',
	url: 'https://pizza-pizza.pizza',
	iconSrc: LinkIcon
};

export default [
	AboutMe,
	Resume,
	{
		name: 'My Projects',
		iconSrc: FolderIcon,
		width: 500,
		height: 300,
		minWidth: 300,
		minHeight: 200,
		children: [
			Worm,
			Planechase,
			PizzaDashPizzaDotPizza
		]
	},
	MediaPlayer,
	WebBrowser
];
