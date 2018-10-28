import React, { Component } from 'react';
import MultipleChoice from '../components/MultipleChoice';
import Timer from '../components/Timer';

import store from '../store';



class Start extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){

  }



finishQuiz(){
  
}


  render() {
    return (
      <div className="Start">

        <Timer />

 <MultipleChoice />

        <p></p>
      </div>
    );
  }
}


export default Start;
