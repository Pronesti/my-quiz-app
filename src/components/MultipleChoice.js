import React, { Component } from 'react';
import {Button, ButtonGroup} from 'react-bootstrap';
import * as PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import store from '../Store'
import * as firebase from 'firebase';

class MultipleChoice extends Component {
  constructor(props){
    super(props);

    this.state = {
      data: '',
      answer1: '1',
      answer2: '2',
      answer3: '3',
      answer4: '4',
      correctAnswer: '2',
      d_1: false,
      d_2: false,
      d_3: false,
      d_4: false,
    }

  }


  componentDidMount(){
    this.fetchAnswers(this.props.answersID);
  }

  fetchAnswers(id){
var selectedQuestion;

    const dbRefObject = firebase.database().ref().child('questions').child('multiplechoices').child(id);
    dbRefObject.on('value', snap => { 
      selectedQuestion = snap.val();

      this.setState({
        answer1: selectedQuestion.answer1,
        answer2: selectedQuestion.answer2,
        answer3: selectedQuestion.answer3,
        answer4: selectedQuestion.answer4,
        correctAnswer: selectedQuestion.correctAnswer,
      })
   });


  }

checkAnswer(e){

  if (this.state.correctAnswer == e.target.name){
    store.update(s => {s.currentScore++});
    console.log("Actual Score: " + store.getState().currentScore);
    //NextQuestion
    this.setState({d_1: true,d_2: true,d_3: true,d_4: true});
  }else{
    //Wrong Answer
    store.update(s => {s.currentScore--});
    switch (e.target.name) {
      case "1": return this.setState({d_1: true});
      case "2": return this.setState({d_2: true});
      case "3": return this.setState({d_3: true});
      case "4": return this.setState({d_4: true});
      default: return console.log("Error");
    }
  }

 
}

  render() {
   const {answer1,answer2,answer3,answer4, d_1, d_2, d_3, d_4} = this.state;
    return (
      <div className="MultipleChoice">
  <div className="Answers">
  <ButtonGroup vertical>
  <Button variant="outline-light" name="1" onClick={ e => this.checkAnswer(e)} disabled={d_1}>{answer1}</Button>
  <Button variant="outline-light" name="2" onClick={ e => this.checkAnswer(e)} disabled={d_2}>{answer2}</Button>
  <Button variant="outline-light" name="3" onClick={ e => this.checkAnswer(e)} disabled={d_3}>{answer3}</Button>
  <Button variant="outline-light" name="4" onClick={ e => this.checkAnswer(e)} disabled={d_4}>{answer4}</Button>
  </ButtonGroup>
  </div>
      </div>
    );
  }
}

export default MultipleChoice;
