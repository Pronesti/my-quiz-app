import React, { Component } from 'react';
import MultipleChoice from '../components/MultipleChoice';
import Question from '../components/Question';
import Timer from '../components/Timer';

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
    console.log(this.state);
  }

  render() {
   const {question} = this.state;
    return (
      <div className="Start">

        <Timer />
        <Question answersID={question} />
        <MultipleChoice answersID={question} />
        <Button onClick={() => this.nextQuestion()}> Next </Button>
        {console.log(this.state)}
      </div>
    );
  }
}


export default Start;
