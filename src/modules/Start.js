import React, { Component } from 'react';
import MultipleChoice from '../components/MultipleChoice';
import Question from '../components/Question';
import Timer from '../components/Timer';
import Single from '../components/Single';

import {Button} from 'react-bootstrap';
import ScoreCount from '../components/ScoreCount';


class Start extends Component {
  constructor(props){
    super(props);

    this.state = {
      questions: [1,2,3,4,5,1,2,3,4,5],
    }
  }

  componentDidMount(){

  }

  makeQuestion(question){
    return(
      <div className="question2">
          <Question answersID={question} />
          <MultipleChoice answersID={question} />
      </div>
    );
  }

finishQuiz(){
  
}


  render() {
    return (
      <div className="Start">

        <Timer />
        <ScoreCount />

       {this.state.questions.map(question => this.makeQuestion(question))}

        <p></p>
        <Button variant="outline-danger" onClick={() => this.finishQuiz()}> Finish </Button>
      </div>
    );
  }
}


export default Start;
