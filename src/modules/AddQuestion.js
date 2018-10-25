import React, { Component } from 'react';
import logo from './logo.svg';
import {Button, Form, Row, Col, Card } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import * as firebase from 'firebase';

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
      dates: true,
      multiplechoice: false,
      newID: 0,
    }
  }

  componentDidMount(){
    
  }



addQuestionDates(){

  const {newID} = this.state;

  const dbRefObject = firebase.database().ref().child('questions').child('dates');
  dbRefObject.on('value', snap => { 
    this.setState({newID: snap.val().count});
    console.log(this.state.newID);
  });

    firebase.database().ref('questions/dates/' + newID).set({
      question: this.state.question,
      correctAnswer: this.state.correctAnswer,
  }, function(error){
    console.log(error);
  });

  firebase.database().ref('questions/dates/').set({
    count: newID+1,
}, function(error){
  console.log(error);
});
  }

addQuestionMC(){

  const {newID} = this.state;

  const dbRefObject = firebase.database().ref().child('questions').child('multiplechoices');
  dbRefObject.on('value', snap => { 
   var entry = snap.val();
    this.setState({newID: entry.count});
    console.log("el ID es: " + this.state.newID);
  });

    firebase.database().ref('questions/multiplechoices/'+ newID).set({
      question: this.state.question,
      correctAnswer: this.state.correctAnswer,
      answer1: this.state.answer1,
      answer2: this.state.answer2,
      answer3: this.state.answer3,
      answer4: this.state.answer4,
  }, function(error){
    console.log(error);
  });

  firebase.database().ref('questions/multiplechoices/').set({
    count: newID+1,
});
}


handleChange(e){
  this.setState({
      [e.target.name]: e.target.value
  });
}


showMultipleChoice(){
  return (
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
        <Button variant="warning" onClick={() => this.addQuestionMC()} > Add Multiple Choice</Button>
        </Form>
        
  );
}

showDates(){
  return (
  <Form>
        <Form.Group>
        <Form.Label>Question</Form.Label>
        <Form.Control type="text" placeholder="Enter question" name="question" onChange={e => this.handleChange(e)} />
        </Form.Group>
        <Form.Group>
        <Form.Label>Possible Answers</Form.Label>
        <Form.Control type="text" placeholder="Enter answer" name="correctAnswer" onChange={e => this.handleChange(e)} />
        </Form.Group>
        <Button variant="warning" onClick={() => this.addQuestionDates()} > Add </Button>
        </Form>
        
        );
}

  render() {
    return (
      <div className="AddQuestion">

        <Card className="formulario question">
        {this.showDates()}      
        </Card>
        
        <Card className="formulario question2">
        {this.showMultipleChoice()}      
        </Card>

      </div>
    );
  }
}

export default AddQuestion;
