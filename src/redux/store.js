import {applyMiddleware, combineReducers, createStore, compose} from 'redux';
import thunk from 'redux-thunk';
import webBrowser from './web-browser';
import windows from './windows';

const devToolsCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
	webBrowser,
	windows
});

export default (defaultState = {}) => {
	return createStore(
		reducer,
		defaultState,
		devToolsCompose(applyMiddleware(thunk))
	);
};
