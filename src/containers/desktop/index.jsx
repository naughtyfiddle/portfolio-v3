import React from 'react';
import {connect} from 'react-redux';

import Wallpaper from './partials/wallpaper';
import Taskbar from '../taskbar';
import DesktopIcon from '../../components/desktop-icon';
import Window from '../../components/window';
import {
	blurApps,
	focusApp,
	killApp,
	launchApp,
	maximizeApp,
	minimizeApp,
	unmaximizeApp
} from '../../redux/windows';

function Desktop(props) {
	const aboutMeApp = {
		name: 'About Me',
		iconSrc: 'static/img/my-computer.png'
	};

	const windows = props.runningApps.map((app) => {
		return (
			<Window
				app={app}
				killApp={props.killApp}
				maximizeApp={props.maximizeApp}
				minimizeApp={props.minimizeApp}
				unmaximizeApp={props.unmaximizeApp}
				focusApp={props.focusApp}
				key={app.name}
			>
				<div className="dummy"/>
			</Window>
		);
	});

	return (
		<div className="desktop">
			<Wallpaper onClick={props.blurApps}/>
			<DesktopIcon
				app={aboutMeApp}
				launchApp={props.launchApp}
			/>
			{windows}
			<Taskbar/>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		runningApps: state.windows.runningApps
	};
}

function mapDispatchToProps(dispatch) {
	return {
		blurApps() {
			return dispatch(blurApps());
		},
		focusApp(app) {
			return dispatch(focusApp(app));
		},
		killApp(app) {
			return dispatch(killApp(app));
		},
		launchApp(app) {
			return dispatch(launchApp(app));
		},
		maximizeApp(app) {
			return dispatch(maximizeApp(app));
		},
		minimizeApp(app) {
			return dispatch(minimizeApp(app));
		},
		unmaximizeApp(app) {
			return dispatch(unmaximizeApp(app));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Desktop);
