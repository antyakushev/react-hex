// QUESTION: is it a good practice to access the store directly from the action creators?
import store from '../store'
import { stepSelector, playerSelector, currentPlayerSelector, playerEconomics } from '../selectors'

export const begin = (numberOfPlayers=2) => (
  {
    type: 'BEGIN',
    numberOfPlayers
  }
)

export const selectNewUnit = (role) => {
  return {
    type: 'SELECT_NEW_UNIT',
    role,
    player: playerSelector(store.getState()),
  }
}

export const clickCell = (cid, role) => {
  const state = store.getState()
  if (stepSelector(state) === 0) {
    if (typeof role === 'number') {
      return {
        type: 'SELECT_UNIT',
        role,
        cid,
        player: playerSelector(state),
      }
    } else {
      return {
        type: 'PLACE_NEW_UNIT',
        cid,
        player: playerSelector(state),
        role: currentPlayerSelector(state).selected,
        economics: playerEconomics(state)
      }
    }
  } else {
    return {
      type: 'MOVE_UNIT',
      cid,
      player: playerSelector(state),
    }
  }
  // TODO: MOVE_UNIT and PROSELYTIZE
}

// Beware! Someone may be killed!
export const moveUnit = (toCid) => {
  return {
    type: 'MOVE_UNIT',
    toCid,
  }
}

// It's what the bishop does
export const proselytize = (cell) => {
  return {
    type: 'PROSELYTIZE',
    cell,
  }
}
