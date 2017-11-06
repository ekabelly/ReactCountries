import React from 'react';
import MyLi from '../countrytable/myli';

const objToUl = obj =>{
	return Object.keys(obj).map((keyName, i)=>{
		if (typeof obj[keyName] === 'object' && obj[keyName]) {
			return (<li key={i}>{keyName}:<ul key={i}> {objToUl(obj[keyName])} </ul></li>)
		}
		return <MyLi key={i} infoName={keyName} info={obj[keyName]} />
	})
}

module.exports = {objToUl}