import React from "react";
import CountryTable from './countrytable';
import ObjInfo from './objinfo';

export default class Layout extends React.Component{
	constructor(props){
		super(props);
		this.state= {
			curItem: {}
		}
	}

	selectItem(item){
		const newState = Object.assign({}, this.state);
		newState.curItem = item;
		this.setState(newState);
	}

	render(){
		return(
			<div className="container-fluid">
				<div className="col-md-6 thumbnail container-fluid">
					<div className="row" style={{margin: 0}}>
						<CountryTable history={this.props.history} itemHandler={(item)=>this.selectItem(item)} />
					</div>
				</div>
				<div className="col-md-6 thumbnail container-fluid">
					<div className="row " style={{margin: 0}}>
						{this.state.curItem?<ObjInfo url="https://restcountries.eu/rest/v2/name/"  obj={this.state.curItem} /> : null}
					</div>
				</div>
			</div>
		)
	}
}