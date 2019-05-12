import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';

import Apps from 'src/apps';
import Wallpaper from './partials/wallpaper';
import Window from './partials/window';
import DesktopIcon from '../desktop-icon';

import styles from './desktop.module.css';

import {
	blurApps,
	focusApp,
	killApp,
	maximizeApp,
	minimizeApp,
	unmaximizeApp
} from 'src/redux/windows';

function Desktop(props) {
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
						key={app.name}
					/>
				)) }
			</div>
			{ props.runningApps.map((app) => (
				<Window
					key={app.name}
					app={app}
					kill={() => props.killApp(app)}
					maximize={() => props.maximizeApp(app)}
					minimize={() => props.minimizeApp(app)}
					unmaximize={() => props.unmaximizeApp(app)}
					focus={() => props.focusApp(app)}
					containerWidth={containerWidth}
					containerHeight={containerHeight}
				/>
			)) }
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
	maximizeApp,
	minimizeApp,
	unmaximizeApp
};

export default connect(mapStateToProps, mapDispatchToProps)(Desktop);
