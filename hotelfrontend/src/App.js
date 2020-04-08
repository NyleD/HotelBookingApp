import React from 'react';
import { Header } from './Header.js';
import { AppBody } from "./AppBody";

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
          <AppBody/>
        </React.Fragment>
    );
  }
}


export default App;
