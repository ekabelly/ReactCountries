import React from "react";
import Arrow from "./arrow";

export default ({data, sort})=> {
	return (
		<tr>
			{data.map((x, i)=><th key={i}> {x} <Arrow sort={sort} key={i} keyName={x} /></th>)}
		</tr>);
}