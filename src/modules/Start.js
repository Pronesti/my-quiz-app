import React, { Component } from 'react';
import MultipleChoice from '../components/MultipleChoice';
import Timer from '../components/Timer';
import Score from '../components/Score';
import {Row, Col, Container, Button} from 'react-bootstrap';
import store from '../store';
class Start extends Component {

  componentWillMount(){
     
    
  }

  componentDidMount(){
 
  }

test(){
  store.update(s => {
                s.currentQuestion.title = "asd";
                s.currentQuestion.answer1 = "das";
                s.currentQuestion.answer2 = "dasd";
                s.currentQuestion.answer3 = "asd";
                s.currentQuestion.answer4 = "asdasd";
                s.currentQuestion.correctAnswer = "asdasd";
  });
  store.update(s=> (s.currentQuestion.position++));
  console.log(store.getState());
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
  <Button onClick={() => this.test()}>+</Button>
      </div>
    );
  }
}


export default Start;
