import React from "react";
import PropTypes from 'prop-types';

export default class Arrow extends React.Component{
	constructor(props){
		super(props);
		this.ArrowClicked = this.ArrowClicked.bind(this);
		this.state = {
			position: 'down'
		}
	}

	ArrowClicked(){
		const position = this.state.position=='down'?'up':'down';
		this.setState({
			position: position
		});
		this.props.sort(position, this.props.keyName);
	}

	render(){
		if (this.props.keyName == 'population' || this.props.keyName == 'name' || this.props.keyName == 'area') {
			return (<span onClick={()=>this.ArrowClicked()} className={'glyphicon glyphicon-chevron-'+this.state.position}></span>);
		}
		return null;
	}
}

Arrow.PropTypes = {
	position: PropTypes.string,
	keyName: PropTypes.string.isRequired
}