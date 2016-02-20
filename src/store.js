import game from './reducers'
import { createStore } from 'redux'
let store = createStore(game)
export default store
