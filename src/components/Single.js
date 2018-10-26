import React, { Component } from 'react';
import {Button, ButtonGroup, Form} from 'react-bootstrap';
import * as PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import store from '../Store'
import {DatePicker} from '@blueprintjs/datetime'
import * as firebase from 'firebase';

class Single extends Component {
  constructor(props){
    super(props);

    this.state = {
      correctAnswer: 0,
      answer: 0,
    }

  }


  componentDidMount(){
    this.fetchAnswers(this.props.answersID);
  }

  fetchAnswers(id){
    var selectedQuestion;

    const dbRefObject = firebase.database().ref().child('questions').child('singles').child(id);
    dbRefObject.on('value', snap => { 
      selectedQuestion = snap.val();

      this.setState({
        correctAnswer: selectedQuestion.correctAnswer,
      })
   });


  }

checkAnswer(e){
  console.log(this.state);
  if (this.state.correctAnswer == this.state.answer){
    store.update(s => {s.currentScore++});
    console.log("Actual Score: " + store.getState().currentScore);
    //NextQuestion

  }else{
    //Wrong Answer
    store.update(s => {s.currentScore--})
    console.log("Actual Score: " + store.getState().currentScore);
    }
  }

 handleChange(date) {
        this.setState({ selectedDate: date });
    }

  render() {
    return (
      <div className="Single">
            <Form.Control type="number" onChange={(e) => (this.setState({answer: e.target.value}))} />
  <Button variant="outline-light" name="1" onClick={ e => this.checkAnswer(e)} size="sm">Check</Button>
      </div>
    );
  }
}

export default Single;
