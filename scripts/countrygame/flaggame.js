import React from 'react';
import axios from 'axios';
import AnswerBtn from './answerbtn';

export default class FlagGame extends React.Component{
	constructor(props){
		super(props);
		this.state = {}
	}

	componentDidMount(prevProps, prevState){
		console.log('didmount');
		const data = axios.get('https://restcountries.eu/rest/v2?fields=name;flag').then((response)=>
			{console.log('first setState');
				const initInfo = this.initGameData(response.data);
				this.setState({
					data: response.data,
					countries: initInfo['countries'],
					answers: initInfo['answers'],
					turn:0,
					score:0
				});
			});
	}

	initGameData(data){
		const countries = this.createCoutriesArr(data);
		const answers = this.createAnswers(data, countries[0]);
		return {answers ,countries};
	}

	createAnswers(data, country){
		const answers = this.createRandArr(data, 3).map(x=>x.name);
		answers.push(country.name);
		return answers;
	}

	createCoutriesArr(allCountries){
		return this.createRandArr(allCountries, this.props.flagsN);
	}	

	createRandArr(data, arrLength){
		const res = [];
		for(let i = 0; i < arrLength; i++){
			const temp = data.splice(Math.floor(Math.random()*(data.length)), 1);
			res.push(temp[0]);
		}
		return res;
	}

	nextTurn(bool){
		const newScore = bool?this.state.score+1:this.state.score;
		const newTurn = this.state.turn+1;
		console.log(bool?'correct!':'oopsy, wrong answer! the correct answer was '+this.state.countries[this.state.turn].name);
		console.log(newTurn, this.props.flagsN)
		const newAnswers = newTurn != this.props.flagsN ? this.createAnswers(this.state.data, this.state.countries[newTurn]):[];
		this.setState({
			turn: newTurn,
			score: newScore,
			answers: newAnswers
		});
	}

	componentWillUpdate(nextProp, nextState){
		console.log('turn number:'+nextState.turn+' ur current score is now:'+nextState.score);
	}

	render(){
		if (!this.state.data) {return <h1> loading... </h1>;}
		if (this.state.turn===this.props.flagsN) {return <h1> congratz! ur score is: {this.state.score} out of {this.props.flagsN}</h1>;}
		return(
			<div className="container-fluid text-center">
				<h1> Flag Game </h1>
				<div className="row">
					<div className="col-md-offset-1 col-md-10 thumbnail">
					<img className="img-thumbnail" src={this.state.countries[this.state.turn].flag} width="200" />
					{this.createRandArr(this.state.answers,4).map((x, i)=> <AnswerBtn onClick={(val)=>this.nextTurn(this.state.countries[this.state.turn].name==val)} btnValue={x} key={i} />)}
					</div>
				</div>
			</div>
		)
	}
}