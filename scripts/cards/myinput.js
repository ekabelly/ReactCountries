import React from 'react';
import PropTypes from 'prop-types';

export default class MySelect extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			inputVal: ''
		}
	}

	onChange(e){
		this.setState({inputVal: e.target.value});
	}

	componentDidUpdate(prevProps, prevState){
		this.state.inputVal!==prevState.inputVal?this.props.onChange(this.state.inputVal):null;
	}

	render(){
		return (
			<input type={this.props.type} id={this.props.id} value={this.state.inputVal} placeholder={this.props.PH} onChange={(e)=>this.onChange(e)} />
		)
	}
}

MySelect.PropTypes = {
	type: PropTypes.string.isRequired,
	inputVal: PropTypes.string.isRequired,
	PH: PropTypes.string.isRequired
}