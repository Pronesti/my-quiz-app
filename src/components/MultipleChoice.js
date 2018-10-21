import React, { Component } from 'react';
import {Button, ButtonGroup} from 'react-bootstrap';
import * as PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

class MultipleChoice extends Component {
  constructor(props){
    super(props);

    this.state = {
      data: '',
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
    }
  }

  componentDidMount(){

    const answersID = this.props.answersID;

    const url = "url/" + answersID;
        fetch(url)
          .then( respuesta => respuesta.json())
          .then( question =>  {
            this.setState({data: question});
          })
          .catch();

          this.setState({
      answer1: this.state.data.answer1,
      answer2: this.state.data.answer2,
      answer3: this.state.data.answer3,
      answer4: this.state.data.answer4,
          });

  }
  
  render() {
    const {answer1, answer2, answer3, answer4} = this.state;
    return (
      <div className="MultipleChoice">
  <div className="Answers">
  <ButtonGroup vertical>
  <Button variant="outline-light">{answer1}</Button>
  <Button variant="outline-light">{answer2}</Button>
  <Button variant="outline-light">{answer3}</Button>
  <Button variant="outline-light">{answer4}</Button>
  </ButtonGroup>
  </div>
      </div>
    );
  }
}

export default MultipleChoice;
