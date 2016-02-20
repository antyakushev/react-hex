import { combineReducers } from 'redux'
import player from './player'
import playerUnits from './playerUnits'
import cells from './cells'

const game = combineReducers({player, playerUnits, cells})

export default game
