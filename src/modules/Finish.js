import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import store from '../store'
import Score from '../components/Score';
import * as firebase from 'firebase';
import {Redirect} from 'react-router-dom';

class Finish extends Component {
  componentDidMount(){
    store.update(s => s.game.finished = false);
    store.update(s => s.currentQuestion.position = 1);
    firebase.auth().onAuthStateChanged(function(user) {
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
      
    if(store.getState().score.currentScore > store.getState().score.highScore){
      firebase.database().ref('highscores/' + store.getState().login.username).set(
        store.getState().score.currentScore
        );
    }else{
      alert("Your highest score is: " + store.getState().score.highScore);
    }
  }

  componentWillUnmount(){ //on exit?
    store.update(s => {
      s.score.currentScore = 0;
      s.currentQuestion.position = 1;
      s.game.timesup = false;
    })
  }

  render() {
    if (store.getState().login.state === false) {
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
