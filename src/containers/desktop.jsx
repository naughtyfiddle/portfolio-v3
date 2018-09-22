import React from 'react';
import {connect} from 'react-redux';

import Apps from '../apps';
import DesktopIcon from '../components/desktop-icon';
import Taskbar from '../components/taskbar';
import Wallpaper from '../components/wallpaper';
import Window from '../components/window';

import {
	blurApps,
	focusApp,
	killApp,
	launchApp,
	maximizeApp,
	minimizeApp,
	unmaximizeApp
} from '../redux/windows';

class DesktopContainer extends React.Component {

	state = {
		width: 0,
		height: 0
	}

	captureDesktopDimensions = (ref) => {
		if (ref.clientWidth !== this.state.width || ref.clientHeight !== this.props.height) {
			this.setState({
				width: ref.clientWidth,
				height: ref.clientHeight
			});
		}
	}

	render() {
		const icons = Apps.map((app) => {
			return (
				<DesktopIcon
					app={app}
					launchApp={this.props.launchApp}
					key={app.name}
				/>
			);
		});

		const windows = this.props.runningApps.map((app) => {
			return (
				<Window
					app={app}
					killApp={this.props.killApp}
					maximizeApp={this.props.maximizeApp}
					minimizeApp={this.props.minimizeApp}
					unmaximizeApp={this.props.unmaximizeApp}
					focusApp={this.props.focusApp}
					key={app.name}
					containerWidth={this.state.width}
					containerHeight={this.state.height}
				>
					<app.content
						isFocused={app.isFocused}
					/>
				</Window>
			);
		});

		return (
			<div
				className="desktop"
				ref={this.captureDesktopDimensions}
			>
				<Wallpaper onClick={this.props.blurApps}/>
				{icons}
				{windows}
				<Taskbar
					focusApp={this.props.focusApp}
					launchApp={this.props.launchApp}
					runningApps={this.props.runningApps}
				/>
			</div>
		);
	}
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

export default connect(mapStateToProps, mapDispatchToProps)(DesktopContainer);
