import { combineReducers } from 'redux'
import turn from './turn'
import players from './players'
import cells from './cells'

const game = combineReducers({turn, players, cells})

export default game
