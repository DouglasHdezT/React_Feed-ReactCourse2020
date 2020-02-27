import React, {Component} from 'react';
import {withRouter} from "react-router-dom"

const initState = {
	username: "",
	email: "",
	password: "",
	errorFlag: false,
}

class Register extends Component{
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
			email: this.state.email,
			password: this.state.password,
		}
		
		let config = {
			method : 'POST',
			headers: {
				'Content-type': 'Application/json'
			},
			body: JSON.stringify(user),
		};

		fetch('https://reactcourseapi.herokuapp.com/user/register', config)
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
			<div className="full-centered">
				<div className = "jumbotron">
					<h1 className="display-3">Registro</h1>
	
					<form onSubmit={this.submitHandler}>
						<div className="form-group">
							<label>Username: 
								<input
									className="form-control" 
									type = "text" 
									id = "username" 
									onChange = {this.changeHandler}
									value = {this.state.username}/>
							</label>
			
							<label>Email: 
								<input 
									className="form-control"
									type = "email" 
									id = "email" 
									onChange = {this.changeHandler}
									value = {this.state.email}/>
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
							<button onClick={()=>{this.props.history.push('/login')}} type="button" className="btn btn-outline-info">Sign in</button>
							<button className="btn btn-primary" type="submit">Sign up</button>
						</div>
					</form>
					{this.state.errorFlag && 
						<div className="alert alert-dismissible alert-danger">
	  						<strong>Oh snap!</strong> Hubo un error en el registro de usuario.
						</div>
					}
				</div>
			</div>
		);
	}
}

export default withRouter(Register);