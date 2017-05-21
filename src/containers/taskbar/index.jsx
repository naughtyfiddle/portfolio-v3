import React from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';

import Clock from './partials/clock';
import StartButton from './partials/start-button';
import {focusApp} from '../../redux/windows';

function Taskbar(props) {
	const apps = props.runningApps.map((app) => {
		return (
			<button
				className={classnames('taskbar-app', {focused: app.isFocused})}
				onClick={() => props.focusApp(app)}
				key={app.name}
			>
				<img src={app.iconSrc}/>
				{app.name}
			</button>
		);
	});

	return (
		<div className="taskbar">
			<StartButton />
			{apps}
			<Clock />
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
		focusApp(app) {
			return dispatch(focusApp(app));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Taskbar);
