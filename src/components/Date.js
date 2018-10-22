import React, { Component } from 'react';
import {Button, ButtonGroup, Form} from 'react-bootstrap';
import * as PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import store from '../Store'
import {DatePicker} from '@blueprintjs/datetime'

class Date extends Component {
  constructor(props){
    super(props);

    this.state = {
      data: '',
      answer: '1',
      correctAnswer: '2',
    }

  }


  componentDidMount(){
    this.fetchAnswers(this.props.answersID);
  }

  fetchAnswers(id){
    const url = "http://localhost:3000/questions/" + id;
    console.log(url);
    fetch(url)
    .then( respuesta => respuesta.json())
    .then( question =>  {
      this.setState({data: question});
      this.setState({
        correctAnswer: this.state.data.correctAnswer,
            });
    })
    .catch();        

  }

checkAnswer(e){

  if (this.state.correctAnswer === this.state.answer){
    store.update(s => {s.currentScore++});
    console.log("Actual Score: " + store.getState().currentScore);
    //NextQuestion

  }else{
    //Wrong Answer
    store.update(s => {s.currentScore--})
    }
  }

 handleChange(date: Date) {
        this.setState({ selectedDate: date });
    }

  render() {
    return (
      <div className="Date">
            <Form.Control type="number" onChange={(e) => (this.setState({answer: e.target.value}))} />
  <Button variant="outline-light" name="1" onClick={ e => this.checkAnswer(e)} size="sm">?</Button>
      </div>
    );
  }
}

export default Date;
