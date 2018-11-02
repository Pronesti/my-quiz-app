import React, { Component } from 'react';

//import dependencies
import {Row, Col, Container, Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';

//import data managment
import * as firebase from 'firebase';
import store from '../store';

//Import components
import MultipleChoice from '../components/MultipleChoice';
import Timer from '../components/Timer';
import Score from '../components/Score';





class Start extends Component {

  componentWillMount(){
     
    
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(function(user) { //Check if user is logged
      if (user) {
        
      } else {
        store.update(s => s.login.state = false)
      }
    });
  }

  render() {
    if (store.getState().login.state === false) { // redirects user if he is not logged
      return (<Redirect to="/login" />);
  }
    return (
      <div className="Start">
        <Container>
  <Row>
    <Col><Timer /></Col>
    <Col xs={6}></Col>
    <Col><Score /></Col>
  </Row>
  <Row></Row>
  <Row>
    <Col></Col>
    <Col xs={5}><MultipleChoice /></Col>
    <Col></Col>
  </Row>
  <Row>
    <Col></Col>
    <Col xs={5}></Col>
    <Col></Col>
  </Row>
</Container>
      </div>
    );
  }
}


export default Start;
