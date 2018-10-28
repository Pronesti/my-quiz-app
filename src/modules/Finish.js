import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import store from '../store'
import Score from '../components/Score';
import * as firebase from 'firebase';

class Finish extends Component {
  componentDidMount(){
    store.update(s => s.game.finished = false);
    store.update(s => s.currentQuestion.position = 1);
  }


  uploadScore(){
    firebase.database().ref('highscores/' + store.getState().login.username).set(
    store.getState().score.currentScore
    );
  }

  componentWillUnmount(){
    store.update(s => {
      s.score.currentScore = 0;
      s.currentQuestion.position = 1;
      s.game.timesup = false;
    })
  }

  render() {
    return (
      <div className="Finish">
      {store.getState().game.timesup ? (<p>You are out of time</p>) : ("")}
            <Score />
          <div className="espaciologoboton"></div>

          <Button variant="outline-light" size="sm" onClick={() => this.uploadScore()}> Upload Score </Button>
          <Link to="/scoreboard"><Button variant="outline-light" size="sm"> Show Scoreboard </Button></Link>
          <p> {} </p>
      </div>
    );
  }
}

export default Finish;
