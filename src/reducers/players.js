// Contains players which contain units
import { nextPlayer } from '../Utils'
import { ROLES } from '../Consts'

// TODO: allow choosing the number of players
const initialPlayersState =
  Array.apply(null, Array(2)).map(
    () => ({
      selected: 0
    })
  )

const players = (state, action) => {
  switch (action.type) {
    case 'SELECT_NEW_UNIT':
      return state.map(
          (player, i) => player.selected === i ?
          {selected: action.role} :
          player
        )
    // case 'PLACE_NEW_UNIT':
    //   return state.map(
    //     (player, i) =>
    //     if i !== action.player {
    //       return player
    //     } else {
    //       const isAvailable = ROLE_PRICES[role] <= -action.economics
    //       return {
    //         selected: role
    //       }
    //     }
    //   )
    default:
      return state || initialPlayersState
  }
}

export default players
