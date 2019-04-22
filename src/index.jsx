import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import createStore from './redux/store';
import Desktop from './containers/desktop';
import styles from './theme.module.css';

const TAB = 9;
const store = createStore({
	windows: {
		runningApps: []
	}
});

document.addEventListener('keydown', (e) => {
	if (e.keyCode === TAB) {
		document.body.classList.add(styles.keyboardAccessible);
	}
});

document.addEventListener('mousedown', () => {
	document.body.classList.remove(styles.keyboardAccessible);
});

ReactDOM.render(
	<Provider store={store}>
		<Desktop/>
	</Provider>
, document.getElementById('content'));
