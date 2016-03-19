// Contains players which contain units
import { nextPlayer, isLastStep } from 'Utils'
import { ROLES, ROLE_PRICES } from 'Consts'

// TODO: allow choosing the number of players
const initialPlayersState =
  Array.apply(null, Array(2)).map(
    () => ({
      selected: null
    })
  )

const player = (state, action) => {
  const { selected } = state
  switch (action.type) {
    case 'SELECT_NEW_UNIT':
      return {
        selected: action.role
      }
    case 'SELECT_UNIT':
      return {
        selected: null
      }
    case 'PLACE_NEW_UNIT':
      if (isLastStep(action.role, action.step)) {
        return {
          selected: null
        }
      } else {
        return state
      }
  }
}

const players = (state, action) => {
  switch (action.type) {
    case 'SELECT_NEW_UNIT':
    case 'SELECT_UNIT':
    case 'PLACE_NEW_UNIT':
      return state.map(
        (p, i) => (
          i !== action.player ? p : player(p, action)
        )
      )
    default:
      return state || initialPlayersState
  }
}

export default players
