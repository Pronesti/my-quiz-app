import React, { Component } from 'react';
import MultipleChoice from '../components/MultipleChoice';
import Timer from '../components/Timer';
import Score from '../components/Score';
import {Row, Col, Container} from 'react-bootstrap';


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
