import React, { Component } from 'react';
import {Button, ButtonGroup} from 'react-bootstrap';
import * as PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import store from '../Store'

class MultipleChoice extends Component {
  constructor(props){
    super(props);

    this.state = {
      answerID: '',
      data: '',
      answer1: '1',
      answer2: '2',
      answer3: '3',
      answer4: '4',
      correctAnswer: '2',
      d_1: false,
      d_2: false,
      d_3: false,
      d_4: false,
    }

  }

  shouldComponentUpdate(nextProps, nextState){
    return true;
}


  componentDidMount(){
    this.setState({answerID: this.props.answersID});

    this.setTimeout(() => {
      console.log('I do not leak!');
    }, 500);

    const url = "http://localhost:3000/questions/" + this.state.answersID;


    console.log(url);


        fetch(url)
          .then( respuesta => respuesta.json())
          .then( question =>  {
            this.setState({data: question});
            this.setState({
              answer1: this.state.data.answer1,
              answer2: this.state.data.answer2,
              answer3: this.state.data.answer3,
              answer4: this.state.data.answer4,
              correctAnswer: this.state.data.correctAnswer,
                  });
          })
          .catch();        
          console.log(this.state);    
  }

checkAnswer(e){

  const {d_1, d_2, d_3, d_4} = this.state;

  if (this.state.correctAnswer === e.target.name){
    store.update(s => {s.currentScore++});
    console.log("Actual Score: " + store.getState().currentScore);
    //NextQuestion
    this.setState({d_1: true,d_2: true,d_3: true,d_4: true});
  }else{
    //Wrong Answer
    store.update(s => {s.currentScore--});
    switch (e.target.name) {
      case "1": return this.setState({d_1: true});
      case "2": return this.setState({d_2: true});
      case "3": return this.setState({d_3: true});
      case "4": return this.setState({d_4: true});
      default: return console.log("Error");
    }
  }

 
}

  render() {
   const {answer1,answer2,answer3,answer4, d_1, d_2, d_3, d_4} = this.state;
    return (
      <div className="MultipleChoice">
  <div className="Answers">
  <ButtonGroup vertical>
  <Button variant="outline-light" name="1" onClick={ e => this.checkAnswer(e)} disabled={d_1}>{answer1}</Button>
  <Button variant="outline-light" name="2" onClick={ e => this.checkAnswer(e)} disabled={d_2}>{answer2}</Button>
  <Button variant="outline-light" name="3" onClick={ e => this.checkAnswer(e)} disabled={d_3}>{answer3}</Button>
  <Button variant="outline-light" name="4" onClick={ e => this.checkAnswer(e)} disabled={d_4}>{answer4}</Button>
  </ButtonGroup>
  </div>
      </div>
    );
  }
}

export default MultipleChoice;
