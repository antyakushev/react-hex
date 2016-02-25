// QUESTION: is it a good practice to access the store directly from the action creators?
import store from '../store'
import { currentPlayerSelector } from '../selectors'

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
  }
}

export const clickCell = (cid, role) => {
  const state = store.getState()
  if (typeof role === 'number') {
    return {
      type: 'SELECT_UNIT',
      role,
      cid,
    }
  } else {
    return {
      type: 'PLACE_NEW_UNIT',
      cid,
      player: state.player,
      role: currentPlayerSelector(state).selected
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
