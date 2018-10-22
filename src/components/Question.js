import React, { Component } from 'react';

class Question extends Component {
  constructor(props){
    super(props);
    this.state = {
      question: '?',
    }
  }
  

  componentDidMount(){
    const answersID = this.props.answersID;


    const url = "http://localhost:3000/questions/" + answersID;
        fetch(url)
          .then( respuesta => respuesta.json())
          .then( question =>  {
            this.setState({
              question: question.title,
            })
          })
          .catch();        
          //console.log(this.state.data);

  }

  render() {
    const {question} = this.state;
    return (
      <div className="Question">
    <p>{question}</p>
      </div>
    );
  }
}

export default Question;
