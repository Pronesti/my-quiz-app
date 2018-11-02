import React from 'react';
import ReactDOM from 'react-dom';

//css
import './index.css';

//other
import App from './App';
import * as serviceWorker from './serviceWorker';

//import dependencies
import store from './store'

//ReactDOM.render(<App />, document.getElementById('root'));

const render = ()=> {
    ReactDOM.render(<App />, document.getElementById('root'));
  }

  store.subscribe(render);
  render();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
