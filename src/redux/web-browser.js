const RESET = 'web-browser/RESET';
const NAVIGATE = 'web-browser/NAVIGATE';
const SET_URL = 'web-browser/SET_URL';
const GO_FORWARD = 'web-browser/GO_FORWARD';
const GO_BACKWARD = 'web-browser/GO_BACKWARD';

const HOME_PAGE = 'https://bing.com/';

const DEFAULT_STATE = {
	url: HOME_PAGE,
	location: HOME_PAGE,
	history: [HOME_PAGE],
	historyIndex: 0
};

function generateUrl(inputString) {
	const searchPrefix = 'https://www.bing.com/search?q=';

	const matchDomainName = /^[a-zA-Z0-9-]*\./;

	const matchPrefix = /^(https?|file):\/\//;

	if (inputString.search(matchPrefix) === -1 && inputString.search(matchDomainName) >= 0) {
		return 'http://'.concat(inputString);
	} else if (inputString.search(matchPrefix) >= 0) {
		return inputString;
	} else {
		return searchPrefix.concat(inputString);
	}
}

export default function reducer(state = {...DEFAULT_STATE}, {type, payload}) {
	switch (type) {
		case RESET: {
			return {...DEFAULT_STATE};
		}
		case NAVIGATE: {
			const location = generateUrl(state.url);
			const newHistory = state.history.slice(0, state.historyIndex + 1);
			newHistory.push(location);

			return {
				url: location,
				history: newHistory,
				historyIndex: newHistory.length - 1,
				location: location
			};
		}
		case SET_URL: {
			return {
				...state,
				url: payload
			};
		}
		case GO_FORWARD: {
			const newHistoryIndex = Math.min(state.historyIndex + 1, state.history.length - 1);
			const newLocation = state.history[newHistoryIndex];

			return {
				...state,
				historyIndex: newHistoryIndex,
				location: newLocation,
				url: newLocation
			};
		}
		case GO_BACKWARD: {
			const newHistoryIndex = Math.max(state.historyIndex - 1, 0);
			const newLocation = state.history[newHistoryIndex];

			return {
				...state,
				historyIndex: newHistoryIndex,
				location: newLocation,
				url: newLocation
			};
		}
		default:
			return state;
	}
}

export function reset() {
	return {
		type: RESET
	};
}

export function navigate() {
	return {
		type: NAVIGATE
	};
}

export function setUrl(url) {
	return {
		type: SET_URL,
		payload: url
	};
}

export function goForward() {
	return {
		type: GO_FORWARD
	};
}

export function goBackward() {
	return {
		type: GO_BACKWARD
	};
}
