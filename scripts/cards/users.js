import React from "react";
import axios from 'axios';
import MySelect from './select';
import MyInput from './myinput';
import Card from './card.js';

export default class Users extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			data: [],
			sortBy: '',
			search: {
				field:'id',
				input:''
			},
			options: [{display:'last name', value:'last_name'},{display:'first name', value:'first_name'},{display:'id',value:'id'},{display:'gender',value:'gender'}]
		}
	}

	componentDidUpdate(prevProps, prevState){
		if(this.state.sortBy !== prevState.sortBy){
			this.props.history.push('/users?sortBy='+this.state.sortBy);
			this.sortBy(this.state.sortBy);
		}
	}

	componentWillMount(){
		console.log(this.props.history.location.search.slice(8))
		this.getUsers().then(({data})=>this.setState({data: data, sortBy:this.props.history.location.search.slice(8)})).catch(err=>console.log(err));
	}

	getUsers(){
		return axios.get('http://localhost:4500/data');
	}

	searchBy(SearchTerm, term){
		const newSearch = Object.assign(this.state.search);
		newSearch[term] = SearchTerm;
		this.setState({search: newSearch});
	}

	sortBy(orderBy){
		const sort_obj = (orderBy, cb) =>{
			const key = cb ? 
			(x)=> {return cb(x[orderBy])} : (x)=> {return x[orderBy]};
			return (a, b) => {
				return a = key(a), b = key(b), 1 * ((a > b) - (b > a));
			} 
		}
		console.log(this.props.history.location.search.indexOf(this.state.sortBy));
		const sortedData = this.state.data;
		const cb = orderBy!=='id'?(x)=>x.toUpperCase():parseInt;
		this.setState({data: sortedData.sort(sort_obj(orderBy, cb)), sortBy: orderBy});
	}

	render(){
		if (this.state.data) {
			const users = this.state.data.filter((x)=> x[this.state.search.field].toLowerCase().indexOf(this.state.search.input) !== -1);
			return (
				<div className="container-fluid">
					<div className="row">
						<div>
							<div className="col-md-12">
								<label htmlFor="searchBy"> Search By: <MySelect onChange={(SearchTerm)=>this.searchBy(SearchTerm, 'field')} options={this.state.options} />
									<MyInput id='searchBy' type="search" PH='search' onChange={(SearchTerm)=>this.searchBy(SearchTerm, 'input')} />
									</label>
							</div>
							<div className="col-md-12">
								<label htmlFor="sortBy"> Sort By: <MySelect onChange={(orderBy)=>this.sortBy(orderBy)} options={this.state.options} selectedOption={this.props.history.location.search.slice(8)} /></label>
							</div>
						</div>
						<div className="col-md-12 container-fluid">
							{users.map((user, i)=><Card user={user} key={i} />)}
						</div>
					</div>
				</div>)}else{
			(<h2> loading... </h2>)}
	}
}