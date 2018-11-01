import createStore from 'pure-store';

const store = createStore({
    login: {
        state: null,
        username: null,
        email: null,
        picture: null,
    },
    score: {
        currentScore: 0,
        highScore: 0,
    },
    currentQuestion: {
        position: 1,
        title: '',
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: '',
        correctAnswer: 0,
    },
    game:{
        questions: [],
        finished:false,
        timesup:false,
    },
})

export default store;