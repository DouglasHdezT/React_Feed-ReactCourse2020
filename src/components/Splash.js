import React, {Component} from "react";
import {withRouter} from "react-router-dom";

class Splash extends Component{

	constructor(props){
		super(props);

		this.state = {
			loading: true,
			dots: '.',
		}

		this.interval = 0;
	}

	componentDidMount(){
		const token = localStorage.getItem("token");
		setTimeout(()=>{
			if( token ){
				this.verifyToken(token);
			}else{
				this.props.history.push("/login")
			}
		}, 2000);

		this.interval = setInterval(()=>{
			this.state.dots.length === 5 ? this.setState({dots: '.'}) : this.setState({dots: this.state.dots + '.'})
		},250);		
	}

	verifyToken = async (token) => {
		let config = {
			method : 'GET',
			headers:{
				authorization: `Bearer ${token}`
			}
		}

		fetch('https://reactcourseapi.herokuapp.com/verifytoken', config)
			.then(res => {
				if (res.ok){
					this.setState({
						loading: false,
					})

					clearInterval(this.interval)
				}else{
					localStorage.removeItem("token");
					this.props.history.push("/login");
				}
			})
	}

	render(){
		const splash = (
			<div className="full-centered">
				<h1>Carganding {this.state.dots}</h1>
			</div>
		);
		return this.state.loading ? splash : this.props.children
	}

}

export default withRouter(Splash);