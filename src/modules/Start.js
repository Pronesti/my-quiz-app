import React, { Component } from 'react';
import MultipleChoice from '../components/MultipleChoice';
import Timer from '../components/Timer';
import Score from '../components/Score';
import {Row, Col, Container, Button} from 'react-bootstrap';
import store from '../store';
import * as firebase from 'firebase';
import {Redirect} from 'react-router-dom';

class Start extends Component {

  componentWillMount(){
     
    
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        
      } else {
        store.update(s => s.login.state = false)
      }
    });
  }

test(){
  store.update(s=> (s.currentQuestion.position++));
}

  render() {
    if (store.getState().login.state === false) {
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
  <Button onClick={() => this.test()}>+</Button>
      </div>
    );
  }
}


export default Start;
