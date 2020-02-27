import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

const initState = {
	username: "",
	password: "",
	errorFlag: false,
}

class Login extends Component{
	constructor(props){
		super(props);

		localStorage.getItem('token') && this.props.history.push('/');

		this.state = {
			...initState,
		}
	}

	submitHandler = event => {
		event.preventDefault();

		const user = {
			username: this.state.username,
			password: this.state.password,
		}
		
		let config = {
			method : 'POST',
			headers: {
				'Content-type': 'Application/json'
			},
			body: JSON.stringify(user),
		};

		fetch('https://reactcourseapi.herokuapp.com/user/login', config)
			.then(res => {
				if( res.ok ){
					res.json()
					.then (data => {
						localStorage.setItem('token', data.token);
						this.props.history.push("/")
					})
				} else {
					this.setState({
						errorFlag: true,
					})
				}
			})
	}

	changeHandler = (event) => {
		this.setState({
			[event.target.id]: event.target.value,
		})
	}

	render(){
		return (
			<div className= "full-centered">
				<div className = "jumbotron">
					<h1 className="display-3">Inicio de sesión</h1>
			
					<form onSubmit={this.submitHandler}>
						<div className="form-group">
							<label>Username or email: 
								<input
									className="form-control" 
									type = "text" 
									id = "username" 
									onChange = {this.changeHandler}
									value = {this.state.username}/>
							</label>
					
							<label>Password: 
								<input
									className="form-control" 
									type = "password" 
									id = "password" 
									onChange = {this.changeHandler}
									value = {this.state.password}/>
							</label>
						</div>
						<div className="user-btns">
							<button className="btn btn-primary" type="submit">Sign in</button>
							<button onClick={()=>{this.props.history.push('/register')}} type="button" className="btn btn-outline-info">Sign up</button>
						</div>
					</form>
					{this.state.errorFlag && 
						<div className="alert alert-dismissible alert-danger">
			  						<strong>Oh snap!</strong> Hubo un error en el inicio de sesión.
						</div>
					}
				</div>
			</div>
		);
	}
}

export default withRouter(Login)