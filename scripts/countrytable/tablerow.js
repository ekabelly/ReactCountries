import React from "react";
import MyLi from './myli';
import {objToUl} from '../modules/objtoul';

export default ({data, keysArr, handler}) => {
	return (<tr onClick={()=>handler(data)}>
			{keysArr.map((x, i)=>{ 
				let content = data[x];
				if (x === 'flag') { 
					content = <img src={content} width="40" />;
				}
				if(typeof data[x] !== "string" && typeof data[x] !== 'number' && data[x]){
					content = objToUl(data[x]);
				}
				return (<td key={i}> {content} </td>)
				})
		}
		</tr>);
}