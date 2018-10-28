import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import store from '../store'
import Score from '../components/Score';

class Play extends Component {
  render() {
    return (
      <div className="Play">
      {store.getState().game.timesup ? (<p>You are out of time</p>) : ("")}
            <Score />
          <div className="espaciologoboton"></div>
          <Link to="/scoreboard"><Button variant="outline-light" size="sm"> Show Scoreboard </Button></Link>
          <p> {} </p>
      </div>
    );
  }
}

export default Play;
