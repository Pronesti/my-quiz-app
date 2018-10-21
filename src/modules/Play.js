import React, { Component } from 'react';
import logo from './logo.svg';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import store from '../Store'

class Play extends Component {
  render() {
    return (
      <div className="Play">
        <h3>My Quiz App</h3>
          <img src={logo} className="App-logo" alt="logo" /> <br />
          <div className="espaciologoboton"></div>
          <Link to="/start"><Button variant="outline-light" size="sm"> Play </Button></Link>
          <p> {} </p>
      </div>
    );
  }
}

export default Play;
