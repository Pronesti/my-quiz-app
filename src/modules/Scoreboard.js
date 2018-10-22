import React, { Component } from 'react';
import {Table} from 'react-bootstrap';
import * as firebase from 'firebase';

class Scoreboard extends Component {
  constructor(props){
    super(props);
    this.state ={
      scores: [],
      cellNumber:1,
    }

  }


  componentDidMount(){
    let a;
   const dbRefObject = firebase.database().ref().child('highscores');
   dbRefObject.on('value', snap => { 
     a = JSON.stringify(snap.val(), null, 3)
    // console.log(snap.val());
    this.setState({scores: a})
  });
 let b = this.makeScoreList();

  }

  makeScoreList(){
    var count = 2;

    let scoreList = [];
    for(let i=1; i < count+1 ;i++){
      const dbRefObject = firebase.database().ref().child('highscores').child(i);
      dbRefObject.on('value', snap => { 
        scoreList[i] = snap.val();
     });
    }

    console.log(scoreList);

    return scoreList;
  }

  makeCell(cell){
    return(<tr>
      <td>{cell.name}</td>
      <td>{cell.score}</td>
      </tr>)
  }

  render() {
    return (
      <div className="Scoreboard">
<Table striped bordered hover>
  <thead>
    <tr>
      <th>Name</th>
      <th>Score</th>
    </tr>
  </thead>
  <tbody>
   {this.makeScoreList().map(cell => this.makeCell(cell))}

  </tbody>
</Table>
      </div>
    );
  }
}

export default Scoreboard;
