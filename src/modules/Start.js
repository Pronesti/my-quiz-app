import React, { Component } from 'react';

//import dependencies
import {Row, Col, Container} from 'react-bootstrap';

//Import components
import Game from '../components/Game';
import Timer from '../components/Timer';
import Score from '../components/Score';
import store from '../store';

class Start extends Component {

  componentDidMount(){
    store.update(s => {
      s.score.currentScore = 0;
      s.currentQuestion.position = 1;
    });
  }

currentPosition(){
  if(typeof store.getState().currentQuestion.position !=="undefined"){
    return (<h3>{store.getState().currentQuestion.position}/5</h3>);
  }
}

  render() {
    return (
      <div className="Start">
        <Container>
  <Row>
    <Col><Timer /></Col>
    <Col>{this.currentPosition()}</Col>
    <Col><Score /></Col>
  </Row>
  <Row></Row>
  <Row>
    <Col></Col>
    <Col><Game /></Col>
    <Col></Col>
  </Row>
  <Row>
    <Col></Col>
    <Col></Col>
    <Col></Col>
  </Row>
</Container>
      </div>
    );
  }
}


export default Start;
