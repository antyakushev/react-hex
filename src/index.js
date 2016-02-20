import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Game from './components/Game'
import store from './store'

const app = (
   <Provider store={store}>
      <Game />
   </Provider>
)

ReactDOM.render(app, document.getElementById('root'))
