import React, { Component } from 'react';
import './App.css';

import {BrowserRouter as Router,Switch, Route } from 'react-router-dom';
import firebase from 'firebase';

import store from './store';

import Play from './modules/Play';
import Start from './modules/Start';
import Login from './modules/Login';
import AddQuestion from './modules/AddQuestion';
import Scoreboard from './modules/Scoreboard';

import MyNavbar from './components/MyNavbar';


// Initialize Firebase
var config = {
  apiKey: "AIzaSyDR1JvHhCY87_b7IsyyIz8o0WzPaOg8aeo",
  authDomain: "my-quiz-app-dd.firebaseapp.com",
  databaseURL: "https://my-quiz-app-dd.firebaseio.com",
  projectId: "my-quiz-app-dd",
  storageBucket: "my-quiz-app-dd.appspot.com",
  messagingSenderId: "408931369375"
};
firebase.initializeApp(config);


class App extends Component {

  componentDidMount() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        store.update({
          login: {
            state: true,
            username: user.displayName,
            email: user.email,
            picture: user.photoURL,
          }
        });
      } else {
        // No user is signed in.
        store.update({ login: { state: false } });
      }
    }).bind(this);
  }

  render() {
    return (
      <div className="App">
      <Router>
  <div>
<MyNavbar />
<Switch>
    <Route exact path="/" component={Play}/>
    <Route exact path="/start" component={Start}/>
    <Route exact path="/login" component={Login}/>
    <Route exact path="/add" component={AddQuestion}/>
    <Route exact path="/scoreboard" component={Scoreboard}/>
</Switch>
</div>
</Router>
      </div>
    );
  }
}

export default App;
