import React from "react";
import TableHead from "./tablehead";
import TableRow from "./tablerow";
import CheckBoxes from "./checkboxes";
import {sort_obj} from '../modules/sortobj.js';
import {getCountriesByFields, fetchAllCountries} from '../modules/axiosmodules.js';

export default class CountryTable extends React.Component{
	constructor(props){
		super(props);
		this.sortBy = this.sortBy.bind(this);
		this.state = {
			checkboxesKeys: [],
			data: [],
			searchTerm: '',
			keys: []
		}
	}

	shouldComponentUpdate(nextProps, nextState){
		if (this.state === nextState) {
			return false;
		}
		console.log('render table');
		return true;
	}

	componentDidMount(prevProps, prevState){
		fetchAllCountries().then(({data})=>this.setState({checkboxesKeys: Object.keys(data[0]), keys: ['flag', 'name'], data: data}));
	}

	searchCountry(e){
		this.setState({
			[e.target.id]: e.target.value
		});
	}

	checked(checkboxState, checkboxeName){
		let keys = this.state.keys;
		if (checkboxState.checked) {
			keys.find(key=>key==checkboxeName)?null:keys.push(checkboxeName);
		}else{
			keys = keys.filter((x, i)=>x==checkboxeName?false:true);
		}
		getCountriesByFields(keys).then(({data})=>{
				this.setState({keys, data});
		});
		
	}

	sortBy(direction, orderBy){
		const data = Object.assign([], this.state.data);
		const cb = orderBy === 'name' ? (x)=>x.toUpperCase() : parseInt;
		data.sort(sort_obj(orderBy, direction, cb));
		this.setState({data: data});
	}

	handleChexboxes(){
		return this.state.checkboxesKeys.map((field, i)=>{
			if (field === 'name' || field === 'flag') {return;}
			return (<li className="list-group-item" key={i} style={{width:'33%', float:'left'}}> <CheckBoxes key={i} id={field} checked={false} onChange={(field, y)=>this.checked(field, y)} /></li>)
		});
	}

	render(){
		if (this.state.data) {
			const filteredData = this.state.data.filter((x)=> x.name.toLowerCase().indexOf(this.state.searchTerm) !== -1);
			return(
				<div className="col-md-12">
					<div>
						<ul className="list-group">
							<li className="list-group-item" style={{width:'100%'}}> <input type="search" id="searchTerm" value={this.state.searchTerm} onChange={(e)=>this.searchCountry(e)} placeholder="search" /> </li>
							{this.state.checkboxesKeys?this.handleChexboxes():null}
						</ul>
					</div>
					<div className="table-responsive col-md-12" style={{maxHeight:'550px', display:'table-header-group'}} >
						<table className="table table-hover container-fluid" style={{heighet:'auto'}}>
							<thead>
								{filteredData[0]?<TableHead data={this.state.keys} sort={this.sortBy} />:null}
							</thead>
							<tbody>	
								{filteredData.map((x, i)=> <TableRow data={filteredData[i]} keysArr={this.state.keys} handler={(data)=>this.props.itemHandler(data)} key={i} />)}
							</tbody>
						</table>
					</div>
				</div>)
			}else{return <h1> please wait... </h1>}
		}
	}