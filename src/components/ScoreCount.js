import React, { Component } from 'react';
import  Countdown from 'react-countdown-now';
import store from '../Store';

class ScoreCount extends Component {
    constructor(props){
        super(props);
        this.state = {
            score: 0,
        }
      }

componentDidMount(){

}


  render() {
    return (
      <div className="ScoreCount">
      <h3>Score: {store.getState().currentScore}</h3>
      </div>
    );
  }
}

export default ScoreCount;
