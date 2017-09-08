// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from 'app/App';
import registerServiceWorker from 'setup/registerServiceWorker';
import fetchInitialData from 'setup/fetchInitialData';

fetchInitialData()
	.then((results) => {
		console.log(results)
	})
	.catch((err) => {
		console.warn('something went wrong!', err);
	})

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
