import React from 'react';
import {withRouter}  from 'react-router-dom';


const NavFeed = props => {
	return(
		<nav id="main-nav" className="navbar navbar-dark bg-dark">
			<h1>React Feed v1.0</h1>
			<ul>
				<li>
					<a onClick = {e => {
						e.preventDefault();
						props.history.push('/');
					}} href="#main-nav">Home</a>
				</li>
				
				<li>
					<a onClick = {e => {
						e.preventDefault();
						props.history.push('/');
					}} href="#main-nav">Perfil</a>
				</li>
				
				<li>
					<a onClick = {e => {
						e.preventDefault();
						localStorage.clear()
						props.history.push('/login');
					}} href="#main-nav">Logout</a>
				</li>

				<li>
					<em>{props.username}</em>
				</li>
			</ul>
		</nav>
	);
}

export default withRouter(NavFeed);