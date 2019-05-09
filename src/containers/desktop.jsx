import React, {useState, useEffect, useRef} from 'react';
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

function DesktopContainer(props) {
	const container = useRef(null);
	const [containerHeight, setContainerHeight] = useState(0);
	const [containerWidth, setContainerWidth] = useState(0);

	useEffect(() => {
		const captureDesktopDimensions = () => {
			setContainerHeight(container.current.clientHeight);
			setContainerWidth(container.current.clientWidth);
		}
		captureDesktopDimensions();
		window.addEventListener('resize', captureDesktopDimensions);
		return () => window.removeEventListener('resize', captureDesktopDimensions);
	}, []);

	return (
		<div
			className={styles.desktop}
			ref={container}
		>
			<Wallpaper 
				onClick={props.blurApps}
			/>
			<div className={styles.desktopIcons}>
				{ Apps.map((app) => (
					<DesktopIcon
						app={app}
						launchApp={props.launchApp}
						key={app.name}
					/>
				)) }
			</div>
			{ props.runningApps.map((app) => (
				<Window
					app={app}
					killApp={props.killApp}
					maximizeApp={props.maximizeApp}
					minimizeApp={props.minimizeApp}
					unmaximizeApp={props.unmaximizeApp}
					focusApp={props.focusApp}
					key={app.name}
					containerWidth={containerWidth}
					containerHeight={containerHeight}
				>
					<app.content
						isFocused={app.isFocused}
					/>
				</Window>
			)) }
			<Taskbar
				focusApp={props.focusApp}
				launchApp={props.launchApp}
				runningApps={props.runningApps}
			/>
		</div>
	);
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
