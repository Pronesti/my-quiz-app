import React, { Component } from 'react';

//import dependencies
import { Button, Form, Card, Modal } from 'react-bootstrap';
import * as firebase from 'firebase';

class AddQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: '',
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      correctAnswer: 1,
      singles: true,
      multiplechoice: false,
      lgShow: false,
    }
  }

  addQuestionMC() {
    firebase.database().ref('questions/').push({
      question: this.state.question,
      correctAnswer: Number(this.state.correctAnswer),
      answer1: this.state.answer1,
      answer2: this.state.answer2,
      answer3: this.state.answer3,
      answer4: this.state.answer4,
      type: "mc",
    });
    this.setState({ lgShow: true })
  }

  addQuestionSingles() {
    firebase.database().ref('questions/').push({
      question: this.state.question,
      correctAnswer: this.state.correctAnswer,
      type: "sg",
    });
    this.setState({ lgShow: true })
  }



  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
   
  }

  checkRadio(e){ // updates state when radio is clicked
   if (this.state.singles === true){
     this.setState({singles: false, multiplechoice: true});
   }else{
    this.setState({singles: true, multiplechoice: false});
   }
  }


  showMultipleChoice() {
  if (this.state.multiplechoice){
    return (
<Card className="formulario question2">
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
              <option selected="selected">1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </Form.Control>
          </Form.Group>
        </Form.Group>
        <Button variant="warning" onClick={() => this.addQuestionMC()} > Add Multiple Choice</Button>
      </Form></Card>
    );
  }
  }

  showSingles() {
    if (this.state.singles){
      return (
        <Card className="formulario question">
        <Form>
          <Form.Group>
            <Form.Label>Question</Form.Label>
            <Form.Control type="text" placeholder="Enter question" name="question" onChange={e => this.handleChange(e)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Possible Answers</Form.Label>
            <Form.Control type="text" placeholder="Enter answer" name="correctAnswer" onChange={e => this.handleChange(e)} />
          </Form.Group>
          <Button variant="warning" onClick={() => this.addQuestionSingles()} > Add </Button>
        </Form>
      </Card>
      );
    }
  }

  render() {
    return (
      <div className="AddQuestion">

       <div className="radios">
       <Form.Group controlId="formGroupEmail">
      <Form.Check inline
        name="options" 
        type="radio"
        label="Multiple Choice"
        id="multiplechoice"
        onClick={(e) => this.checkRadio(e)}
      />  
      <Form.Check inline 
        name="options" 
        type="radio"
        label="Single Choice"
        id="singles"
        defaultChecked
        onClick={(e) => this.checkRadio(e)}
      /> 
      </Form.Group>
       </div>

        {this.showSingles()}      

        {this.showMultipleChoice()}


        <Modal
          size="sm"
          show={this.state.lgShow}
          onHide={() => this.setState({lgShow: false})}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Success
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>Question Uploaded</Modal.Body>
        </Modal>

      </div>
    );
  }
}

export default AddQuestion;
