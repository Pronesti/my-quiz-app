import React, { Component } from 'react';

//import dependencies
import store from '../store';

class Score extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
      }

  render() {
    return (
      <div className="Score">
        <h3>Score: {store.getState().score.currentScore}</h3>
      </div>
    );
  }
}

export default Score;