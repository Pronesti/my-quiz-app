import React, { Component } from 'react';
import MultipleChoice from '../components/MultipleChoice';
import Question from '../components/Question';
import Timer from '../components/Timer';
import Date from '../components/Date';

import {Button} from 'react-bootstrap';


class Start extends Component {
  constructor(props){
    super(props);

    this.state = {
      question:1,
    }
  }

  nextQuestion(){
    let num = this.state.question;
    this.setState({question: num + 1});
  }

  render() {
   const {question} = this.state;
    return (
      <div className="Start">

        <Timer />
        <Question answersID={question} />
        <MultipleChoice answersID={question} />
        <Date answersID={question}/>
        
        <Button onClick={() => this.nextQuestion()}> Next </Button>
      </div>
    );
  }
}


export default Start;
