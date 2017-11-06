import React from 'react';

export default ({btnValue, onClick}) =>{
	return (
		<span onClick={()=>onClick(btnValue)} className="btn btn-default centered center-block thumbnail"> {btnValue} </span>
	)
}