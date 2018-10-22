import React, { Component } from 'react';
import MultipleChoice from '../components/MultipleChoice';
import Question from '../components/Question';
import Timer from '../components/Timer';

class Start extends Component {
  render() {
    return (
      <div className="Start">
        <Timer />
        <Question answersID="2" />
        <MultipleChoice answersID="2" />
      </div>
    );
  }
}

export default Start;
