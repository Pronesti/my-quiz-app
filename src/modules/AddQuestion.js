import React, { Component } from 'react';
import logo from './logo.svg';
import {Button, Form, Row, Col, Card } from 'react-bootstrap';
import {Link} from 'react-router-dom';

class AddQuestion extends Component {
  render() {
    return (
      <div className="AddQuestion">
        <Card className="formulario">
        <Form>
        <Form.Group>
        <Form.Label>Question</Form.Label>
        <Form.Control type="text" placeholder="Enter question" />
        </Form.Group>
        <Form.Group>
        <Form.Label>Possible Answers</Form.Label>
        <Form.Control type="text" placeholder="Enter first answer" />
        <Form.Control type="text" placeholder="Enter second answer" />
        <Form.Control type="text" placeholder="Enter third answer" />
        <Form.Control type="text" placeholder="Enter four answer" />
        </Form.Group>
        <Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label>Right Answer</Form.Label>
        <Form.Control as="select">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        </Form.Control>
  </Form.Group>
        </Form.Group>
        </Form>
        <Button variant="warning" > Add </Button>
        </Card>

      </div>
    );
  }
}

export default AddQuestion;
