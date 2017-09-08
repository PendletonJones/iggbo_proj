// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from 'app/App';
import registerServiceWorker from 'setup/registerServiceWorker';
import fetchInitialData from 'setup/fetchInitialData';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'


fetchInitialData()
	.then((results) => {
		console.log(results)
	})
	.catch((err) => {
		console.warn('something went wrong!', err);
	})

ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<Route
				render={({match}) => 
							<App
								match={match}/>}
				path={'/:section'}/>
			<Redirect
				to={'/home'}/>
		</Switch>

	</BrowserRouter>,
	document.getElementById('root')
);
registerServiceWorker();
