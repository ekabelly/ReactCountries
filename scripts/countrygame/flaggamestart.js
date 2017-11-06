import React from 'react';
import FlagGame from './flaggame';

export default class InitGame extends React.Component{
	constructor(props){
		super(props);
		this.state = {}
	}

	flagNHandler(e){
		this.setState({flagsN: JSON.parse(e.target.value)});
	}

	start(){
		this.setState({start: true});
	}


	render(){
		return this.state.start?<FlagGame flagsN={this.state.flagsN} />:(<div>
			<h1> how many flags do u wnat to guess? </h1>
			<input type="number" min="1" max="250" onChange={(e)=>this.flagNHandler(e)} />
			<button onClick={()=>this.start()}> start</button>
		</div>)
	}
}