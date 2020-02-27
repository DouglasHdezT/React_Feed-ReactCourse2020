import React, {Component} from 'react';
import Post from './Post'
import NavFeed from './NavFeed'

class ReactFeed extends Component {
  constructor(props){
    super(props);

    this.state = {
	  posts: [],
	  username:'',
	  token: localStorage.getItem('token')
    }
  }



  likeHandler = index => {
    let postsAux = [...this.state.posts];

	const config = {
		method: "PUT",
		headers: {
			'Content-type': 'Application/json',
			authorization: `Bearer ${this.state.token}`
		},
		body: JSON.stringify(postsAux[index])
	}

	/* fetch('https://reactcourseapi.herokuapp.com/post/', config)
		.then(res => {this.fetchData()}) */

		fetch('https://reactcourseapi.herokuapp.com/post/like', config)
		.then(res => {this.fetchData()})
		
  }

  fetchData = () => {
	let config = {
		method: "GET",
		headers: {
			'Content-type': 'Application/json',
			authorization: `Bearer ${this.state.token}`
		}
	}

	fetch('https://reactcourseapi.herokuapp.com/post/', config)
		.then(res => res.json())
		.then(data => {
			this.setState({
				posts: data.filteredPosts || [] 
			})

		})
  }

  fetchUsername = () => {
	let config = {
		method: "GET",
		headers: {
			'Content-type': 'Application/json',
			authorization: `Bearer ${this.state.token}`
		}
	}

	fetch('https://reactcourseapi.herokuapp.com/user/name', config)
		.then(res => res.json())
		.then(data => {
			this.setState({
				username: data.username || ''
			})

		})
  }

  componentDidMount(){
	this.fetchData();
	this.fetchUsername();
  }
  
  render(){
    const postsComponents = this.state.posts.map((post, index) => {
		
      return (<Post
        key = {index}
        name = {post.user}
		likes = {post.likes}
        title = {post.title}
        text = {post.text}
        image = {post.image}
        onClick = {()=> this.likeHandler(index)}
        />);
      
    });
  
    return (
      <>
	  	<NavFeed
			  username = {this.state.username}
		  />
		<div className = "container">
			<h1 className="display-3">ReactFeed</h1>
			<h2>Recent posts</h2>
	
			<div className="posts">
			{postsComponents}
			</div>
		</div>
	  </>
    );
  }
}

export default ReactFeed;
