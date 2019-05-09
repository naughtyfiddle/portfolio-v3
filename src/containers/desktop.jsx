import React from 'react';
import {connect} from 'react-redux';

import Apps from '../apps';
import DesktopIcon from '../components/desktop-icon';
import Taskbar from '../components/taskbar';
import Wallpaper from '../components/wallpaper';
import Window from '../components/window';
import styles from '../theme.module.css';

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

	captureDesktopDimensions = () => {
		if (this.container.clientWidth !== this.state.width || this.container.clientHeight !== this.props.height) {
			this.setState({
				width: this.container.clientWidth,
				height: this.container.clientHeight
			});
		}
	}

	componentDidMount() {
		this.captureDesktopDimensions();
		window.addEventListener('resize', this.captureDesktopDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.captureDesktopDimensions);
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
				className={styles.desktop}
				ref={(e) => { this.container = e; }}
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

const mapStateToProps = (state) => ({
	runningApps: state.windows.runningApps
});

const mapDispatchToProps = {
	blurApps,
	focusApp,
	killApp,
	launchApp,
	maximizeApp,
	minimizeApp,
	unmaximizeApp
};

export default connect(mapStateToProps, mapDispatchToProps)(DesktopContainer);
