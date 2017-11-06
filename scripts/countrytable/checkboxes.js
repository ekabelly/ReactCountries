import React from "react";
import PropTypes from 'prop-types';

export default class CheckBoxes extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			checked: this.props.checked || false
		};
	}

	shouldComponentUpdate(nextProps, nextState){
		if (this.state === nextState) {
			return false;
		}
		console.log('render checkboxes');
		return true;
	}

	onChange(e){
		const newState = Object.assign({}, this.state);
		newState.checked = e.target.checked;
		this.setState(newState);
	}

	componentWillUpdate(NextProps, NextState){
		this.props.onChange(NextState, this.props.id);
	}

	render(){
		return (<label htmlFor={this.props.id}> {this.props.id} <input type="checkbox" id={this.props.id} checked={this.state.checked} onChange={(e)=>this.onChange(e)} /></label>)
	}
}

CheckBoxes.PropTypes = {
	checked: PropTypes.boolean
}