import React, { Component } from 'react';
import MultipleChoice from '../components/MultipleChoice';
import Question from '../components/Question';
import Timer from '../components/Timer';

class Start extends Component {
  render() {
    return (
      <div className="Start">
        <Timer />
        <Question />
        <MultipleChoice />
      </div>
    );
  }
}

export default Start;
