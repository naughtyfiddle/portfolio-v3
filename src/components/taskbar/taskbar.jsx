import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classnames from 'classnames';

import {focusApp, launchApp} from 'src/redux/windows';
import Clock from './partials/clock';
import StartButton from './partials/start-button';

import styles from './taskbar.module.css';

function Taskbar(props) {
	// appRefs.current is actually an object of refs keyed by app name
	const appRefs = useRef({});

	useEffect(() => {
		const focusMinimized = (e) => appRefs.current[e.detail].focus();
		window.addEventListener('appminimized', focusMinimized);
		return () => window.removeEventListener('appminimized', focusMinimized);
	}, []);

	return (
		<div className={styles.taskbar}>
			<StartButton
				launchApp={props.launchApp}
			/>
			<div className={styles.taskbarApps}>
				{ props.runningApps.map((app) => (
					<button
						ref={(e) => {
							appRefs.current[app.name] = e;
						}}
						className={classnames(styles.taskbarApp, {
							[styles.focused]: app.isFocused
						})}
						onClick={() => props.focusApp(app)}
						key={app.name}
						aria-label={!app.isFocused ? `focus ${app.name}` : ''}
					>
						<img src={app.iconSrc} alt=""/>
						{app.name}
					</button>
				)) }
			</div>
			<Clock />
		</div>
	);
}

Taskbar.defaultProps = {
	runningApps: []
};

const mapStateToProps = (state) => ({
	runningApps: state.windows.runningApps
});

const mapDispatchToProps = {
	focusApp,
	launchApp
};

export default connect(mapStateToProps, mapDispatchToProps)(Taskbar);
