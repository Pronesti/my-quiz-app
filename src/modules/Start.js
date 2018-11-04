import React, { Component } from 'react';

//import dependencies
import {Row, Col, Container} from 'react-bootstrap';

//Import components
import MultipleChoice from '../components/MultipleChoice';
import Timer from '../components/Timer';
import Score from '../components/Score';
import store from '../store';

class Start extends Component {
  
  componentDidMount(){
    store.update(s => s.score.currentScore = 0);
  }

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
