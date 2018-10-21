import createStore from 'pure-store'

const store = createStore({
  logged: null,
  username: '',
  email: '',
  profilepic: '',
  currentScore: '',
  highScore: '',
  currentQuestion: {}
  })

  export default store;