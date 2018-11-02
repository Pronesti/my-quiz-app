import React, { Component } from 'react';

//import dependencies
import {Table} from 'react-bootstrap';
import * as firebase from 'firebase';

class Scoreboard extends Component {
  constructor(props){
    super(props);
    this.state ={
      arrayScores: [],
    }
  }

  componentDidMount(){
    let arrayScores = [];
   const dbRefObject = firebase.database().ref().child('highscores');
   dbRefObject.orderByValue().on('value', snap => { 
    snap.forEach(function(childSnapshot){
      var nombre = childSnapshot.key;
      var score = childSnapshot.val();
      var _user ={nombre: nombre,score: score};
      arrayScores.push(_user);
    })
  this.setState({arrayScores: arrayScores.reverse()});
  });
  }
  
  makeCell(){
    if (typeof this.state.arrayScores !=="undefined"){
     return (this.state.arrayScores.map((cell, index) => {
        return(
        <tr>
          <td>{index+1}</td>
          <td>{cell.nombre}</td>
          <td>{cell.score}</td>
        </tr>)
        }))
    }  
  }

    render() {
        return (
            <div className="Scoreboard">
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.makeCell()}

                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Scoreboard;
