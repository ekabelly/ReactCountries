import React from 'react';

export default ({user})=>{
	return (
	<div className="card thumbnail" style={{width: '30rem', float:'left'}}>
		<div style={{height:'150px'}}>
	  		<img className="card-img-top" src={user.image} width='150' alt="Card image cap" />
	  	</div>
	  	<div className="card-block">
	    	<h4 className="card-title">	Name: {user.first_name+' '+user.last_name} </h4>
	    	<span className="card-text">
	    		<ul className="list-group list-group-flush">
	    			<li className="list-group-item"> Id: {user.id} </li>
	    			<li className="list-group-item"> Email: {user.email} </li>
	    			<li className="list-group-item"> Gender: {user.gender} </li>
	    		</ul>
	    	</span>
	  	</div>
	</div>
	)
}