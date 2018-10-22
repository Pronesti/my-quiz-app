import createStore from 'pure-store'

const store = createStore({
  logged: null,
  username: '',
  email: '',
  profilepic: '',
  currentScore: 0,
  highScore: '',
  currentQuestion: {}
  })

  export default store;