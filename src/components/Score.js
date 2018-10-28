import React, { Component } from 'react';
import store from '../store';


class Score extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
      }

componentDidMount(){

}


  render() {
    return (
      <div className="Score">
        <h3>Score:{store.getState().score.currentScore}</h3>
      </div>
    );
  }
}

export default Score;