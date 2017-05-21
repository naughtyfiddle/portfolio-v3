import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import createStore from './redux/store';
import Desktop from './containers/desktop';

const store = createStore({windows: {runningApps: []}});

ReactDOM.render(
	<Provider store={store}>
		<Desktop/>
	</Provider>
, document.getElementById('content'));
