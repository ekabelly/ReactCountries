import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import CountryTable from './countrytable/countrytable';
import Layout from './countrytable/Layout';
import InitGame from './countrygame/flaggamestart';
import Borders from './countrytable/borders'
import Users from './cards/users';

export default ()=>{
	return (<Router><div>

		<nav className="navbar navbar-default">
			<div className="container-fluid">
				<div>
					<ul className="nav navbar-nav">
						<li><Link to="/CountryTable"> Country Table </Link></li>
						<li><Link to="/layout"> Layout </Link></li>
						<li><Link to="/initgame"> init game </Link></li>
						<li><Link to="/borders"> borders </Link></li>
						<li><Link to="/users"> users </Link></li>
					</ul>
				</div>
			</div>
		</nav>
		<Route path="/CountryTable" component={CountryTable} />
		<Route path="/layout" component={Layout} />
		<Route path="/InitGame" component={InitGame} />
		<Route path="/borders" component={Borders} />
		<Route path="/users" component={Users} />
	</div></Router>)
}