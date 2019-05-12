import {applyMiddleware, combineReducers, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import webBrowser from './web-browser';
import windows from './windows';

const reducer = combineReducers({
	webBrowser,
	windows
});

const logger = createLogger({
	level: 'info',
	timestamp: false
});

export default (defaultState = {}) => {
	return createStore(
		reducer,
		defaultState,
		applyMiddleware(logger, thunk)
	);
};
