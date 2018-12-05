// actions.js
import store from '../store';

export function updateScore(number) {
    store.update(s => s.score.currentScore = s.score.currentScore + number);
}

export function updateHighScore(value) {
    store.update(s =>  s.score.highScore = value);
}

export function nextQuestion() {
    store.update(s => s.currentQuestion.position = s.currentQuestion.position + 1);
}

export function isFinished() {
    if(store.getState().currentQuestion.position < 5){
      return true;   
    }  
}

export function finishGame() {
    store.update(s => s.game.finished = true); //finish game
}

export function resetGame() {
    store.update(s => s.game.finished = false); // resets finish game state
    store.update(s => s.currentQuestion.position = 1); // prepare for new game
}
export function resetStore() {
    store.update(s => {
        s.score.currentScore = 0;
        s.currentQuestion.position = 1;
        s.game.timesup = false;
      })
}

export function storeUser(user) {
    store.update(s => { //store user data in pure-store
        s.login.state = true;
        s.login.username = user.displayName;
        s.login.email = user.email;
        s.login.picture = user.photoURL;
       });
}

export function isLogged(value) {
    store.update(s => s.login.state = value);
}
