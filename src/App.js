import React from 'react';
import './bootstrap.min.css'; 
import './App.css'
import {Switch, Route} from "react-router-dom";

import Register from './components/Register'
import Login from './components/Login'
import Splash from './components/Splash'
import ReactFeed from "./components/Feed/ReactFeed";


function App() {
  return (
	<Switch>
		<Route path="/register" component={Register} />
		<Route path="/login" component={Login} />
		<Route path="/" >
			<Splash>
				<ReactFeed/>
			</Splash>
		</Route>
	</Switch>
  );
}

export default App;
