const BLUR_APPS = 'apps/BLUR_APPS';
const FOCUS_APP = 'apps/FOCUS_APP';
const KILL_APP = 'apps/KILL_APP';
const LAUNCH_APP = 'apps/LAUNCH_APP';
const MAXIMIZE_APP = 'apps/MAXIMIZE_APP';
const MINIMIZE_APP = 'apps/MINIMIZE_APP';
const UNMAXIMIZE_APP = 'apps/UNMAXIMIZE_APP';

const NEW_APP = {
	isFocused: true,
	isMinimized: false
};

function _updateApp(runningApps, appName, properties) {
	const newApps = [];
	for (const app of runningApps) {
		const newApp = {...app};
		if (app.name === appName) {
			for (const prop in properties) {
				newApp[prop] = properties[prop];
			}
		}
		newApps.push(newApp);
	}
	return newApps;
}

function _focusApp(runningApps, appName) {
	return runningApps.map((app) => {
		return {
			...app,
			isFocused: app.name === appName,
			isMinimized: app.name === appName ? false : app.isMinimized
		};
	});
}

export default function reducer(state = {runningApps: []}, {type, payload}) {
	switch (type) {
		case BLUR_APPS: {
			const newApps = state.runningApps.map((app) => {
				return {...app, isFocused: false};
			});
			return {runningApps: newApps};
		}
		case FOCUS_APP: {
			return {runningApps: _focusApp(state.runningApps, payload.name)};
		}
		case KILL_APP: {
			const newApps = state.runningApps.reduce((acc, app) => {
				if (app.name !== payload.name) {
					acc.push(app);
				} else {
					window.dispatchEvent(
						new CustomEvent('appkilled', {detail: app.name})
					);
				}
				return acc;
			}, []);
			return {runningApps: newApps};
		}
		case LAUNCH_APP: {
			if (!state.runningApps.some((app) => app.name === payload.name)) {
				const newApps = state.runningApps.map((app) => {
					return {...app, isFocused: false};
				});
				newApps.push({...NEW_APP, ...payload});
				return {runningApps: newApps};
			} else {
				return {runningApps: _focusApp(state.runningApps, payload.name)};
			}
		}
		case MAXIMIZE_APP: {
			return {
				runningApps: _updateApp(state.runningApps, payload.name, {isMaximized: true})
			};
		}
		case MINIMIZE_APP: {
			window.dispatchEvent(
				new CustomEvent('appminimized', {detail: payload.name})
			);
			return {
				runningApps: _updateApp(state.runningApps, payload.name, {isMinimized: true, isFocused: false})
			};
		}
		case UNMAXIMIZE_APP: {
			return {
				runningApps: _updateApp(state.runningApps, payload.name, {isMaximized: false})
			};
		}
		default:
			return state;
	}
}

export function blurApps() {
	return {type: BLUR_APPS};
}

export function focusApp(app) {
	return {
		type: FOCUS_APP,
		payload: app
	};
}

export function killApp(app) {
	return {
		type: KILL_APP,
		payload: app
	};
}

export function launchApp(app) {
	return {
		type: LAUNCH_APP,
		payload: app
	};
}

export function maximizeApp(app) {
	return {
		type: MAXIMIZE_APP,
		payload: app
	};
}

export function minimizeApp(app) {
	return {
		type: MINIMIZE_APP,
		payload: app
	};
}

export function unmaximizeApp(app) {
	return {
		type: UNMAXIMIZE_APP,
		payload: app
	};
}
