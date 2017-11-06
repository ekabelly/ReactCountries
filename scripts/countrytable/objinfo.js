import React from "react";
import axios from 'axios';
import {objToUl} from '../modules/objtoul';


export default class ObjInfo extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			obj: {}
		};
	}

	shouldComponentUpdate(nextProps, nextState){
		if (nextState === this.state) {
			return false;
		}
		console.log('render objinfo');
		return true;
	}

	componentWillReceiveProps(nextProps){
		axios.get(nextProps.url+nextProps.obj.name).then(({data})=>{
			const newState = Object.assign({}, this.state);
			newState.obj = data[0];
			this.setState(newState);
		});
	}

	render(){
		const {obj} = this.state;
		return Object.keys(obj)[0] ? (
			<div className="container-fluid">
				<div className="row">
					<h1> {obj.name} </h1>
					<div className="col-md-2">
						<img src={obj.flag} width="100" />
					</div>
					<div className="col-md-6">
						<ul> {objToUl(obj)} </ul>
					</div>
				</div>
			</div>
		) : <h1> click on an object for details </h1>}
}