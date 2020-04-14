import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Header } from "./Header";
import { HomePage } from "./HomePage";
import { AddBooking } from "./AddBooking";
import { MyBookings } from "./MyBookings";
import { StatsBody } from "./StatsBody";

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import './index.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar } from '@fortawesome/free-solid-svg-icons'
library.add(faStar);

export class App extends React.Component {
  render() {
    return (
        <React.Fragment>
			<Header/>
			<Router>
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route exact path="/Search" component={AddBooking} />
					<Route path="/MyBookings" component={MyBookings} />
					<Route path="/Stats" component={StatsBody} />
				</Switch>
			</Router>
        </React.Fragment>
    );
  }
}


export default App;
