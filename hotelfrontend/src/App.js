import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Header } from './Header.js';
import { AppBody } from "./AppBody";
import { MyBookings } from "./MyBookings";

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import './index.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faRecycle } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from "@fortawesome/free-solid-svg-icons";

library.add(faStar);
library.add(faSearch);
library.add(faRecycle);
library.add(faTrash);



export class App extends React.Component {
  render() {
    return (
        <React.Fragment>
			<Header/>
			<Router>
				<Switch>
					<Route exact path="/" component={AppBody} />
					<Route path="/MyBookings" component={MyBookings} />
				</Switch>
			</Router>
        </React.Fragment>
    );
  }
}


export default App;
