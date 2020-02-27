import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom";

const RouterApp = (
	<Router>
		<App/>
	</Router>
);

ReactDOM.render(RouterApp, document.getElementById('root'));

