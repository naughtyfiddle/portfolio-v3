import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Clock from './partials/clock';
import StartButton from './partials/start-button';

export default function Taskbar(props) {
	const apps = props.runningApps.map((app) => {
		return (
			<button
				className={classnames('taskbar-app', {focused: app.isFocused})}
				onClick={() => props.focusApp(app)}
				key={app.name}
			>
				<img src={app.iconSrc} alt=""/>
				{app.name}
			</button>
		);
	});

	return (
		<div className="taskbar">
			<StartButton launchApp={props.launchApp}/>
			<div className="taskbar-apps">
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
