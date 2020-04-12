import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { HomePage } from "./HomePage";
import { AddBooking } from "./AddBooking";
import { MyBookings } from "./MyBookings";
import { StatsBody } from "./StatsBody";

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import './index.css';

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
			<Footer/>
        </React.Fragment>
    );
  }
}


export default App;
