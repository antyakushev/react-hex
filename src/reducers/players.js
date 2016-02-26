// Contains players which contain units
import { nextPlayer } from '../Utils'
import { ROLES, ROLE_PRICES } from '../Consts'

// TODO: allow choosing the number of players
const initialPlayersState =
  Array.apply(null, Array(2)).map(
    () => ({
      selected: 0
    })
  )

const player = ({selected}, action) => {
  switch (action.type) {
    case 'SELECT_NEW_UNIT':
      return {
        selected: action.role
      }
    case 'PLACE_NEW_UNIT':
      let role = action.role
      while (ROLE_PRICES[role] * 2 > -action.economics && role !== 0) {
        role--
      }
      return {
        selected: role
      }
  }
}

const players = (state, action) => {
  switch (action.type) {
    case 'SELECT_NEW_UNIT':
    case 'PLACE_NEW_UNIT':
      return state.map(
        (p, i) => (
          i !== action.player ? p : player(state, action)
        )
      )
    default:
      return state || initialPlayersState
  }
}

export default players
