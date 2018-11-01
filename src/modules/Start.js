import React, { Component } from 'react';
import MultipleChoice from '../components/MultipleChoice';
import Timer from '../components/Timer';
import Score from '../components/Score';
import {Row, Col, Container} from 'react-bootstrap';
import * as firebase from 'firebase';
import store from '../store';
class Start extends Component {


  componentDidMount(){
  
    const makeRequest = async () => {
      await this.readQuestions();
      await this.selectQuestion(2);
  };

  makeRequest();
  }

  readQuestions(){
    console.log("reading questions...");
    const dbRefObject = firebase.database().ref().child('questions').child('multiplechoices');
    dbRefObject.on('value', snap => {
        store.update(s => s.game.questions = snap.val());
  })
  console.log(store.getState().game.questions);
}

selectQuestion(number){
  console.log("selecting questions...");

    var selectedQuestion = store.game.questions[number];
  
         store.update(s => {
                         s.currentQuestion.title = selectedQuestion.question;
                         s.currentQuestion.answer1 = selectedQuestion.answer1;
                         s.currentQuestion.answer2 = selectedQuestion.answer2;
                         s.currentQuestion.answer3 = selectedQuestion.answer3;
                         s.currentQuestion.answer4 = selectedQuestion.answer4;
                         s.currentQuestion.correctAnswer = selectedQuestion.correctAnswer;
                     });
                    store.update(s => s.currentQuestion.position = s.getState().currentQuestion.position + 1);
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
