import { combineReducers } from 'redux'
import player from './player'
import players from './players'
import cells from './cells'

const game = combineReducers({player, players, cells})

export default game
