import React, { Component } from 'react';
import { Card,  Button } from 'react-bootstrap';
import * as firebaseui from 'firebaseui';
import * as firebase from 'firebase';
import {Link} from 'react-router-dom';
import store from '../store';


class Login extends Component {
constructor(props){
  super(props);
  this.state = {
  }
}

componentDidUpdate(){

}

componentDidMount(){


  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      store.update(s => {
       s.login.state = true;
       s.login.username = user.displayName;
       s.login.email = user.email;
       s.login.picture = user.photoURL;
      });

      var ref = firebase.database().ref('highscores').child(store.getState().login.username);
      ref.once('value').then(function(snapshot){
        store.update(s =>  s.score.highScore = snapshot.val());
      })

    } else {
      // No user is signed in.
      store.update(s => s.login.state = false);
    }
  }).bind(this);


    var uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
           
            return false;
          },
          uiShown: function() {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
          }
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        signInSuccessUrl: '',
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
        // Terms of service url.
        tosUrl: '<your-tos-url>',
        // Privacy policy url.
        privacyPolicyUrl: '<your-privacy-policy-url>'
      };

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start('#firebaseui-auth-container', uiConfig);





  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(function() {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return firebase.auth().signInWithPopup(firebase.auth.GoogleAuthProvider());
  })
  .catch(function(error) {
    // Handle Errors here.
  });


}

logOut(){
    firebase.auth().signOut().then(function() {

      }).catch(function(error) {
        // An error happened.
      });
}

logginButton(){
        return(<div className="googleUI">
            <div id="firebaseui-auth-container"></div>
            <div id="loader">Loading...</div></div>);
}

loggoutButton(){
        return(<div>
           <Link to="/"><Button color="danger" onClick={ () => (this.logOut()) }>Log Out</Button></Link>
        </div>);
}

render() {
    return (
      <div className="Login">
<Card body className="text-center logginCard">
        <Card.Title>{store.getState().login.state ? ( <h3>{store.getState().login.username}</h3> ) : ("Login")}</Card.Title>
        <Card.Text>{store.getState().login.state ? ( <img className="logginPic" src={store.getState().login.picture} alt={store.getState().login.username} /> ) : (<p></p>)}</Card.Text>
        {store.getState().login.state ? ( this.loggoutButton() ) : ( this.logginButton() )} 
       {store.getState().login.state ? ( "High Score: " + store.getState().score.highScore ) : ( " " )}
      </Card>
      <div>
          </div>

      </div>
    );
  }
}

export default Login;