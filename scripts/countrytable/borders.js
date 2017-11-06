import React from "react";
import ObjInfo from './objinfo';
import CountryBorders from './countryborders';
import {getCountriesByFields, getCountryByFields} from '../modules/axiosmodules.js';

export default class Borders extends React.Component{
	constructor(props){
		super(props);
		this.state ={
			country: {},
			allCountries: [],
			borders: [[]]
		}
	}

	componentDidMount(){
		getCountriesByFields(['name', 'alpha3Code', 'flag']).then(({data})=>this.setState({allCountries:data})).catch(err=>console.log(err));
	}

	onChange(e){
		getCountryByFields(['flag', 'name', 'borders'], e.target.value).then(({data})=>{
			const newState = Object.assign({}, this.state);
			newState.country = data[0];
			newState.borders = this.getBorders(data[0]);
			this.setState(newState);
		});
	}

	getBorders(country){
		return country.borders.map((border, i)=>this.state.allCountries.find((country, i)=>country.alpha3Code === border));
	}

	shouldComponentUpdate(nextProp, nextState){
		if (nextState === this.state) {
			return false;
		}
		console.log('render borders');
		return true;
	}

	render(){
		return(
			<div className="container-fluid">
				<div className="row">
				{this.state.allCountries ? (
					<div className="col-md-12">
						<select onChange={(e)=>this.onChange(e)}>
							<option> </option>
							{this.state.allCountries.map((country, i)=><option key={i}> {country.name} </option>)}
						</select>
					</div>) : null}
					<div>
						<div className="col-md-6 thumbnail">
							{<ObjInfo url="https://restcountries.eu/rest/v2/name/" obj={this.state.country} />}
						</div>
						<div className="col-md-6 container-fluid thumbnail" style={{height:"auto"}}>
							<div className="row" style={{margin:0}}>
								{this.state.borders.length > 0 ? this.state.borders.map((country, i)=><CountryBorders key={i} country={country} />):<p>this country has no borders</p>}
							</div>
						</div>
					</div>
				</div>
			</div>)
	}
}