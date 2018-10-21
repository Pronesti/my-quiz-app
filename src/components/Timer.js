import React, { Component } from 'react';
import  Countdown from 'react-countdown-now';

class Timer extends Component {
    constructor(props){
        super(props);
        this.state = {
            givenTime: 50000,
        }
      }

componentDidMount(){

}

showTimer(){
    const Completionist = () => <span>You are good to go!</span>;

    // Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
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

  render() {
    return (
      <div className="Timer">
        {this.showTimer()}
      </div>
    );
  }
}

export default Timer;
