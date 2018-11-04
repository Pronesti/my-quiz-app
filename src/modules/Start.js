import React, { Component } from 'react';

//import dependencies
import {Row, Col, Container} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';

//import data managment
import * as firebase from 'firebase';
import store from '../store';

//Import components
import MultipleChoice from '../components/MultipleChoice';
import Timer from '../components/Timer';
import Score from '../components/Score';

class Start extends Component {

  render() {
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
