import React from 'react'

const Post = props => {
    return(
        <article className= "post card">
            
            <header className="card-header">
				<h3>
					{props.title}
				</h3>
				<h5>Usuario: {props.name}</h5>
			</header>
            
			<main className="card-body">
				<p>{props.text}</p>
			
				<img src = {props.image} alt = {props.name}/>
			</main>
            
			<footer className="likes card-footer">
				<span> Likes: {props.likes} </span>
                <button  type="button" className="btn btn-outline-primary" onClick = {props.onClick}>Like!</button>
            </footer>
        </article>
    );
}

export default Post;