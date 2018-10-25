import React, { Component } from 'react';
import * as firebase from 'firebase';

class Question extends Component {
  constructor(props){
    super(props);
    this.state = {
      question: '?',
    }
  }
  

  componentDidMount(){
    const answersID = this.props.answersID;

    var selectedQuestion;

    const dbRefObject = firebase.database().ref().child('questions').child('multiplechoices').child(answersID);
    dbRefObject.on('value', snap => { 
      selectedQuestion = snap.val();

      this.setState({
        question: selectedQuestion.question,
      });

  }); }

  render() {
    const {question} = this.state;
    return (
      <div className="Question">
    <p>{question}</p>
      </div>
    );
  }
}

export default Question;
