import React, { Component } from 'react';

//import dependencies
import {Button} from 'react-bootstrap';
import {Link, Redirect} from 'react-router-dom';
import * as firebase from 'firebase';
import store from '../store'

//import components
import Score from '../components/Score';

class Finish extends Component {
  componentDidMount(){
    store.update(s => s.game.finished = false); // resets finish game state
    store.update(s => s.currentQuestion.position = 1); // prepare for new game

    firebase.auth().onAuthStateChanged(function(user) { //check if user is logged
      if (user) {
        
      } else {
        store.update(s => s.login.state = false)
      }
    });
  }


  uploadScore(){
    var ref = firebase.database().ref('highscores').child(store.getState().login.username);
      ref.once('value').then(function(snapshot){
        store.update(s =>  s.score.highScore = snapshot.val());
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
    store.update(s => {
      s.score.currentScore = 0;
      s.currentQuestion.position = 1;
      s.game.timesup = false;
    })
  }

  render() {
    if (store.getState().login.state === false) { // redirects user if is not logged
      return (<Redirect to="/login" />);
    }
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
