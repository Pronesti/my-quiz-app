import React, { Component } from 'react';
import logo from './logo.svg';
import {Button, Form, Row, Col, Card } from 'react-bootstrap';
import {Link} from 'react-router-dom';

class AddQuestion extends Component {
  constructor(props){
    super(props);

    this.state = {
      question: '',
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      correctAnswer: '',
    }
  }


addQuestion(){
  let questionToAdd = {
      type: 'multiplechoice',
      title: this.state.question,
      correctAnswer: this.state.correctAnswer,
      answer1: this.state.answer1,
      answer2: this.state.answer2,
      answer3: this.state.answer3,
      answer4: this.state.answer4,
      
  };

  fetch('http://localhost:3000/questions', { // URL: https://server-subscripcion-jsbrbnwqfv.now.sh/subscripciones
  method: 'post',
  headers: {
    "Content-type": "application/json"
  },
  body: JSON.stringify(questionToAdd, '\t')
})
.then(JSON.stringify(questionToAdd, '\t'))
.then(function (data) {
  console.log('Request succeeded with JSON response', data);
})
.catch(function (error) {
  console.log('Request failed', error);
});

}

handleChange(e){
  this.setState({
      [e.target.name]: e.target.value
  });
 // console.log(this.state);
}

  render() {
    return (
      <div className="AddQuestion">
        <Card className="formulario">
        <Form>
        <Form.Group>
        <Form.Label>Question</Form.Label>
        <Form.Control type="text" placeholder="Enter question" name="question" onChange={e => this.handleChange(e)} />
        </Form.Group>
        <Form.Group>
        <Form.Label>Possible Answers</Form.Label>
        <Form.Control type="text" placeholder="Enter first answer" name="answer1" onChange={e => this.handleChange(e)} />
        <Form.Control type="text" placeholder="Enter second answer" name="answer2" onChange={e => this.handleChange(e)} />
        <Form.Control type="text" placeholder="Enter third answer" name="answer3" onChange={e => this.handleChange(e)} />
        <Form.Control type="text" placeholder="Enter four answer" name="answer4" onChange={e => this.handleChange(e)} />
        </Form.Group>
        <Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label>Right Answer</Form.Label>
        <Form.Control as="select" name="correctAnswer" onChange={e => this.handleChange(e)}>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        </Form.Control>
  </Form.Group>
        </Form.Group>
        </Form>
        <Button variant="warning" onClick={() => this.addQuestion()} > Add </Button>
        </Card>

      </div>
    );
  }
}

export default AddQuestion;
