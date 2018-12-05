import React, { Component } from 'react';

//import dependencies
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import * as firebase from 'firebase';
import store from '../store'

//import components
import Score from '../components/Score';
import { resetGame, updateHighScore } from '../actions';

class Finish extends Component {
  componentDidMount(){
    resetGame();
  }


  uploadScore(){
    var ref = firebase.database().ref('highscores').child(store.getState().login.username);
      ref.once('value').then(function(snapshot){
       updateHighScore(snapshot.val());
      })
      
    if(store.getState().score.currentScore > store.getState().score.highScore){ // checks if new score is better than highscore
      firebase.database().ref('highscores/' + store.getState().login.username).set(
        store.getState().score.currentScore
        );
    }else{
      alert("Your highest score is: " + store.getState().score.highScore);
    }
  }

  componentWillUnmount(){ //on exit resets store
    
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
