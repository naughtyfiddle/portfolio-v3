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

export default function reducer(state = {runningApps: []}, {type, payload}) {
	switch (type) {
		case BLUR_APPS: {
			const newApps = state.runningApps.map((app) => {
				return {...app, isFocused: false};
			});
			return {runningApps: newApps};
		}
		case FOCUS_APP: {
			const newApps = state.runningApps.map((app) => {
				return {
					...app,
					isFocused: app.name === payload.name,
					isMinimized: app.name === payload.name ? false : app.isMinimized
				};
			});
			return {runningApps: newApps};
		}
		case KILL_APP: {
			const newApps = state.runningApps.reduce((acc, app) => {
				if (app.name !== payload.name) {
					acc.push(app);
				}
				return acc;
			}, []);
			return {runningApps: newApps};
		}
		case LAUNCH_APP: {
			if (!state.runningApps.some((app) => app.name === payload.name)) {
				const newApps = [...state.runningApps];
				newApps.push({...NEW_APP, ...payload});
				return {runningApps: newApps};
			} else {
				return state;
			}
		}
		case MAXIMIZE_APP: {
			const newApps = state.runningApps.map((app) => {
				return {
					...app,
					isMaximized: app.name === payload.name ? true : app.isMaximized
				};
			});
			return {runningApps: newApps};
		}
		case MINIMIZE_APP: {
			const newApps = state.runningApps.map((app) => {
				return {
					...app,
					isMinimized: app.name === payload.name,
					isFocused: false
				};
			});
			return {runningApps: newApps};
		}
		case UNMAXIMIZE_APP: {
			const newApps = state.runningApps.map((app) => {
				return {
					...app,
					isMaximized: app.name === payload.name ? false : app.isMaximized
				};
			});
			return {runningApps: newApps};
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
