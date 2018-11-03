import React, { Component } from 'react';

//import dependencies
import { Button, ButtonGroup, Row, Col, Container } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import store from '../store';
import * as firebase from 'firebase';

class MultipleChoice extends Component {
    constructor(props) {
        super(props);
        store.subscribe(() => this.forceUpdate());
        this.state = {
            position: store.getState().currentQuestion.position, // number of question to answer
            d_1: false,
            d_2: false,
            d_3: false,
            d_4: false,
            finished: false,
            repeated: [], //array of already answered questions
        }
    }

    componentDidMount() {
        this.fetchInfo();
    }

    componentDidUpdate() {
        if (this.state.position !== store.getState().currentQuestion.position) { //check new question
            this.setState({
                position: store.getState().currentQuestion.position,
                d_1: false,
                d_2: false,
                d_3: false,
                d_4: false,
            });
            this.fetchInfo();
        }
    }


    fetchInfo() {

        firebase.database().ref().child('questions').child('multiplechoices').on('value', snap => {
            let alltheQuestions = snap.val();
            let keys = Object.keys(alltheQuestions);
            var selectedQuestion;

            selectedQuestion = alltheQuestions[keys[this.randomMaker(keys.length)]];

            store.update(s => {
                s.currentQuestion.title = selectedQuestion.question;
                s.currentQuestion.answer1 = selectedQuestion.answer1;
                s.currentQuestion.answer2 = selectedQuestion.answer2;
                s.currentQuestion.answer3 = selectedQuestion.answer3;
                s.currentQuestion.answer4 = selectedQuestion.answer4;
                s.currentQuestion.correctAnswer = selectedQuestion.correctAnswer;
            });
        });
    }

    checkRepeat(number) { // check if the randomNumber was already answered
        const { repeated } = this.state;
        for (let i = 0; i < repeated.length; i++) {
            if (number === repeated[i]) {
                return true;
            }
        }
    }

    randomMaker(maxlength) { //makes a random number within the number of questions
        let randomNumber;
        do {
            let min = 0;
            let max = maxlength;
            randomNumber = Math.floor(min + (Math.random() * (max - min)));
        } while (this.checkRepeat(randomNumber));
        this.state.repeated.push(randomNumber);
        return randomNumber;
    }

    checkAnswer(e) { 
        if (Number(e.target.name) === store.getState().currentQuestion.correctAnswer) { //correct answer
            store.update(s => s.score.currentScore = s.score.currentScore + 10);
            this.setState({ d_1: true, d_2: true, d_3: true, d_4: true });
        } else { //wrong answer
            store.update(s => s.score.currentScore = s.score.currentScore - 5);
            switch (e.target.name) {
                case "1": return this.setState({ d_1: true });
                case "2": return this.setState({ d_2: true });
                case "3": return this.setState({ d_3: true });
                case "4": return this.setState({ d_4: true });
                default: return console.log("Error");
            }
        }
        if (store.getState().currentQuestion.position < 5) { // checks how many question were answered
            store.update(s => s.currentQuestion.position = s.currentQuestion.position + 1);
        } else {
            store.update(s => s.game.finished = true); //finish game
        }
    }

    makeButtons(){
        const {answer1, answer2, answer3, answer4} = store.getState().currentQuestion;
        const { d_1, d_2, d_3, d_4 } = this.state;

        if(answer1){
            return(
                            <ButtonGroup vertical>
                                    <Button name="1" variant="outline-light" onClick={(e) => this.checkAnswer(e)} disabled={d_1}>{answer1}</Button>
                                    <Button name="2" variant="outline-light" onClick={(e) => this.checkAnswer(e)} disabled={d_2}>{answer2}</Button>
                                    <Button name="3" variant="outline-light" onClick={(e) => this.checkAnswer(e)} disabled={d_3}>{answer3}</Button>
                                    <Button name="4" variant="outline-light" onClick={(e) => this.checkAnswer(e)} disabled={d_4}>{answer4}</Button>
                             </ButtonGroup>)
        }
    }

    render() {
        const {title} = store.getState().currentQuestion;
        
        if (store.getState().game.finished) { // redirects user if is not logged
            return (<Redirect to="/finish" />);
        }

        return (
            <div className="MultipleChoice">
                <Container>
                    <Row>
                        <Col><h5>{title}</h5></Col>
                    </Row>
                    <Row></Row>
                    <Row>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col>
                                {this.makeButtons()}
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>



            </div>
        );
    }
}

export default MultipleChoice;
