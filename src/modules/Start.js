import React, { Component } from 'react';
import MultipleChoice from '../components/MultipleChoice';
import Question from '../components/Question';
import Timer from '../components/Timer';
import Date from '../components/Date';

import {Button} from 'react-bootstrap';
import ScoreCount from '../components/ScoreCount';


class Start extends Component {
  constructor(props){
    super(props);

    this.state = {
      question:1,
    }
  }

  componentDidMount(){

  }

  nextQuestion(){
    let num = this.state.question;
    this.setState({question: num + 1});
  }

  renderQuestion(question){
        return(
          <div>
          <Question answersID={question} />
          <MultipleChoice answersID={question} />
          </div>);
  }

  render() {
   const {question} = this.state;
    return (
      <div className="Start">

        <Timer />
        <ScoreCount />

        {this.renderQuestion(question)}
        
        <Button onClick={() => this.nextQuestion()}> Next </Button>
      </div>
    );
  }
}


export default Start;
