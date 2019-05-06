import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Clock from './partials/clock';
import StartButton from './partials/start-button';
import styles from './taskbar.module.css';

export default function Taskbar(props) {
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

Taskbar.propTypes = {
	focusApp: PropTypes.func.isRequired,
	launchApp: PropTypes.func.isRequired,
	runningApps: PropTypes.arrayOf(
		PropTypes.shape({
			isFocused: PropTypes.bool,
			name: PropTypes.string,
			iconSrc: PropTypes.string
		})
	).isRequired
};

Taskbar.defaultProps = {
	runningApps: []
};
