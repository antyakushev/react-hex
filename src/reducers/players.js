// Will contain players which contain units
import { nextPlayer } from '../Utils'
import { ROLES } from '../Consts'

const initialPlayersState =
  Array.apply(null, Array(2)).map( // TODO: allow choosing the number of players
    () => {
      selected: 0
    }
  )

const players = (state, action) => {
  switch (action.type) {
    case 'SELECT_NEW_UNIT':
      return state.players.map(
          (player, i) => selected === i ?
          {selected: action.role} :
          player
        )
    default:
      return state || initialPlayersState
  }
}

export default players
