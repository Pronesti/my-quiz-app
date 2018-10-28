import React, { Component } from 'react';
import MultipleChoice from '../components/MultipleChoice';
import Timer from '../components/Timer';
import Score from '../components/Score';



class Start extends Component {
  render() {
    return (
      <div className="Start">
        <Timer />
        <Score />
        <MultipleChoice />
      </div>
    );
  }
}


export default Start;
