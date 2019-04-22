import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Clock from './partials/clock';
import StartButton from './partials/start-button';
import styles from './taskbar.module.css';

export default function Taskbar(props) {
	const apps = props.runningApps.map((app) => {
		return (
			<button
				className={classnames(styles.taskbarApp, {
					[styles.focused]: app.isFocused
				})}
				onClick={() => props.focusApp(app)}
				key={app.name}
			>
				<img src={app.iconSrc} alt=""/>
				{app.name}
			</button>
		);
	});

	return (
		<div className={styles.taskbar}>
			<StartButton launchApp={props.launchApp}/>
			<div className={styles.taskbarApps}>
				{apps}
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
		})
	).isRequired
};

Taskbar.defaultProps = {
	runningApps: []
};
