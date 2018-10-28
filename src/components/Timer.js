import React, { Component } from 'react';
import  Countdown from 'react-countdown-now';
import store from '../store';

class Timer extends Component {
    constructor(props){
        super(props);
        this.state = {
            givenTime: 10000,
        }
      }

componentDidMount(){

}

showTimer(){
  // Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    this.noMoreTime();
    return <span>{hours}:{minutes}:{seconds}</span>;
   } else {
     // Render a countdown
     return <span>{hours}:{minutes}:{seconds}</span>;
   }
};

return(<Countdown
  date={Date.now() + this.state.givenTime}
  renderer={renderer}
/>);
}

noMoreTime(){
  store.update(s => s.game.finished = true);
  store.update(s => s.game.timesup = true);
}

  render() {
    return (
      <div className="Timer">
        {this.showTimer()}
      </div>
    );
  }
}

export default Timer;
