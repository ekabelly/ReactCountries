import React from 'react';
import PropTypes from 'prop-types';

export default class MySelect extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			options: this.props.options,
			selectedOption: this.props.selectedOption
		}
	}

	onChange(e){
		this.setState({selectedOption: e.target.value});
	}

	componentDidUpdate(prevProps, prevState){
		this.state.selectedOption!==prevState.selectedOption?this.props.onChange(this.state.selectedOption):null;
	}

	render(){
		return (
			<select defaultValue={this.state.selectedOption} onChange={(e)=>this.onChange(e)}>
				{this.state.options.map((option, i)=><option key={i} value={option.value}> {option.display} </option>)}
			</select>
		)
	}
}
MySelect.PropTypes = {
	options: PropTypes.array.isRequired,
	selectedOption: PropTypes.string
}