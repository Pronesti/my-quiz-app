import React, { Component } from 'react';

//import dependencies
import { Button, ButtonGroup, Row, Col, Container, InputGroup, FormControl} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import store from '../store';
import * as firebase from 'firebase';
import { updateScore, nextQuestion, finishGame, isFinished } from '../actions';

class Game extends Component {
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

        firebase.database().ref().child('questions').on('value', snap => {
            let alltheQuestions = snap.val();
            let keys = Object.keys(alltheQuestions);
            var selectedQuestion;

            selectedQuestion = alltheQuestions[keys[this.randomMaker(keys.length)]];

    if (selectedQuestion.type === "mc"){
        store.update(s => {
                    s.currentQuestion.title = selectedQuestion.question;
                    s.currentQuestion.answer1 = selectedQuestion.answer1;
                    s.currentQuestion.answer2 = selectedQuestion.answer2;
                    s.currentQuestion.answer3 = selectedQuestion.answer3;
                    s.currentQuestion.answer4 = selectedQuestion.answer4;
                    s.currentQuestion.correctAnswer = selectedQuestion.correctAnswer;
                });
    }else{
        store.update(s => {
            s.currentQuestion.title = selectedQuestion.question;
            s.currentQuestion.correctAnswer = selectedQuestion.correctAnswer;
            s.currentQuestion.answer1 = null;
            s.currentQuestion.answer2 = null;
            s.currentQuestion.answer3 = null;
            s.currentQuestion.answer4 = null;
        });
    }
            
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
            updateScore(10);
            this.setState({ d_1: true, d_2: true, d_3: true, d_4: true });
        } else { //wrong answer
            updateScore(-5);
            switch (e.target.name) {
                case "1": return this.setState({ d_1: true });
                case "2": return this.setState({ d_2: true });
                case "3": return this.setState({ d_3: true });
                case "4": return this.setState({ d_4: true });
                default: return console.log("Error");
            }
        }
        if (isFinished()) { // checks how many question were answered
            nextQuestion();
        } else {
            finishGame();
        }
    }

    checkSingle(e){
        if (e.target.value === store.getState().currentQuestion.correctAnswer) { //correct answer
            updateScore(10);
            if (isFinished()) { // checks how many question were answered
               nextQuestion();
            } else {
                finishGame();
            }
            e.target.value = "";
        }
        
    }

    skipQuestion(){
        updateScore(-5);
        if (isFinished()) { // checks how many question were answered
            nextQuestion();
        } else {
            finishGame();
        }
    }

    makeButtons(){
        const {answer1, answer2, answer3, answer4, title} = store.getState().currentQuestion;
        const { d_1, d_2, d_3, d_4 } = this.state;

        if(answer1){
            return(
                            <ButtonGroup vertical>
                                    <Button name="1" variant="outline-light" onClick={(e) => this.checkAnswer(e)} disabled={d_1}>{answer1}</Button>
                                    <Button name="2" variant="outline-light" onClick={(e) => this.checkAnswer(e)} disabled={d_2}>{answer2}</Button>
                                    <Button name="3" variant="outline-light" onClick={(e) => this.checkAnswer(e)} disabled={d_3}>{answer3}</Button>
                                    <Button name="4" variant="outline-light" onClick={(e) => this.checkAnswer(e)} disabled={d_4}>{answer4}</Button>
                             </ButtonGroup>)
        }else{
            if(title){
               return( 
               <div>
                       <InputGroup size="lg" className="inputWidth">
                           <FormControl
                           type="text" onChange={(e) => this.checkSingle(e)}
                           />
                           <InputGroup.Append>
                               <Button variant="danger" name="Pass" onClick={() => this.skipQuestion()}>Skip</Button>
                           </InputGroup.Append>
                       </InputGroup>
                
               </div>)
            }
        }
    }

    render() {
        const {title} = store.getState().currentQuestion;
        
        if (store.getState().game.finished) { // redirects user if is not logged
            return (<Redirect to="/finish" />);
        }

        return (
            <div className="Game">
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

export default Game;
