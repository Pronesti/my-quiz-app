import React, { Component } from 'react';
import logo from './logo.svg';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import store from '../store';

class Play extends Component {

buttonToPlay(){
    return(<Link to="/start"><Button variant="outline-light" size="sm"> Play </Button></Link>)
}

buttonToLogin(){
    return(<Link to="/login"><Button variant="outline-light" size="sm"> Login </Button></Link>)
}

    render() {
        return (
            <div className="Play">
                <h3>My Quiz App</h3>
                <img src={logo} className="App-logo" alt="logo" /> <br />
                <div className="espaciologoboton"></div>
               {store.getState().login.state ? (this.buttonToPlay()) : (this.buttonToLogin())}
            </div>
        );
    }
}

export default Play;
