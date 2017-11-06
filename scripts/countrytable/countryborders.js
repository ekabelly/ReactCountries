import React from "react";

export default ({country})=>{
	return(
		<div className="col-md-6">
			<h2> {country.name} </h2>
			<img src={country.flag} width="100"/>
		</div>
	)
}