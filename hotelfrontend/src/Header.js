import React from 'react';
import logo from './images/logo.png';


export class Header extends React.Component {

    render(){
        return (
            <div>
            <a href="http://localhost:3000/">
            <img class="mx-auto d-block" src={logo} alt="logo" width="150" height="150"/>
            </a>
            </div>
        )
    }

}
