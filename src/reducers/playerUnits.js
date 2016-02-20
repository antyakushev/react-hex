//Redundant. Will be replaced by players reducer
import { ROLES } from '../Consts'

// TODO: reducer for storing the selected unit state, and counting the availability of units
const initialUnitsState = {
  selected: ROLES.PEASANT,
  unitsCount: [0,0,0]
}

// QUESTION: Do I need memoized selectors (reselect) to access this deep state,
// (e.g. selected unit) or is it better to replicate it flatly in the top state level?
// Or maybe I need to store units as an object with the role keys somewhere else
// and provide it to the units with the help of selector?

// IDEA: roles as numbers!

// ANSWER: i should not store this at all! Count can also be counted from the cells.
// Should store only selected. Though it may decrease performance even with memoization.

const units = (state, action) => {
  switch (action.type) {
    case 'SELECT_NEW_UNIT':
      return {
        ...state,
        selected: action.role
      }

    // TODO: check availability (it seems its better to do it in the action creator)
    case 'PLACE_NEW_UNIT':
      state.unitsCount[state.selected] += 1
      return {...state}

    default:
      return state || initialUnitsState
  }
}

export default units
