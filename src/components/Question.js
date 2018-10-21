import React, { Component } from 'react';

class Question extends Component {
  constructor(props){
    super(props);
    this.state = {
      question: '?',
    }
  }
  
  render() {
    const {question} = this.state;
    return (
      <div className="Question">
    <p>{question}</p>
      </div>
    );
  }
}

export default Question;
