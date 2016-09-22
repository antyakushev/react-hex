import game from './reducers'
import { createStore } from 'redux'
const store = createStore(game, window.devToolsExtension && window.devToolsExtension())
export default store
