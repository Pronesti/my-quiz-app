import React, { Component } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import store from '../store';
import * as firebase from 'firebase';
import {Redirect} from 'react-router-dom';

class MultipleChoice extends Component {
    constructor(props) {
        super(props);
        store.subscribe(() => this.forceUpdate());
        this.state = {
            position: store.getState().currentQuestion.position,
            d_1: false,
            d_2: false,
            d_3: false,
            d_4: false,
            finished: false,
        }
    }

    componentDidMount() { //DIDUPDATE = LOOP INFINITO, WILLUPDATE = Maximum update depth exceeded
       this.fetchInfo();
       console.log(this.state.position);
    }

    componentDidUpdate() {
        if (this.state.position !== store.getState().currentQuestion.position){
        this.fetchInfo();
        this.setState({
            position: store.getState().currentQuestion.position,
            d_1: false,
            d_2: false,
            d_3: false,
            d_4: false,
        });    
        }    

   }



    fetchInfo(){
        var selectedQuestion;
        const dbRefObject = firebase.database().ref().child('questions').child('multiplechoices').child(store.getState().currentQuestion.position);
        dbRefObject.on('value', snap => {
            selectedQuestion = snap.val();

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



    checkAnswer(e) {
        console.log(store.getState());
        if (e.target.name == store.getState().currentQuestion.correctAnswer) {
            store.update(s => s.score.currentScore = s.score.currentScore + 10);
            this.setState({ d_1: true, d_2: true, d_3: true, d_4: true });
        } else {
            store.update(s => s.score.currentScore = s.score.currentScore - 5);
            switch (e.target.name) {
                case "1": return this.setState({ d_1: true });
                case "2": return this.setState({ d_2: true });
                case "3": return this.setState({ d_3: true });
                case "4": return this.setState({ d_4: true });
                default: return console.log("Error");
            }
        }
        if (store.getState().currentQuestion.position<5){
            store.update(s => s.currentQuestion.position = s.currentQuestion.position + 1);
        }else
        {
           this.setState({finished: true});
        }
    }

    render() {
        const { title, answer1, answer2, answer3, answer4 } = store.getState().currentQuestion;
        const { d_1, d_2, d_3, d_4 } = this.state;
        
        if (store.getState().finished){
            return (<Redirect to="/finish" />);          
          }

        return (
            <div className="MultipleChoice">
                <h3>{title}</h3>
                <ButtonGroup vertical>
                    <Button name="1" variant="outline-light" onClick={(e) => this.checkAnswer(e)} disabled={d_1}>{answer1}</Button>
                    <Button name="2" variant="outline-light" onClick={(e) => this.checkAnswer(e)} disabled={d_2}>{answer2}</Button>
                    <Button name="3" variant="outline-light" onClick={(e) => this.checkAnswer(e)} disabled={d_3}>{answer3}</Button>
                    <Button name="4" variant="outline-light" onClick={(e) => this.checkAnswer(e)} disabled={d_4}>{answer4}</Button>
                </ButtonGroup>
                
            </div>
        );
    }
}

export default MultipleChoice;
