export const PLAYER_COLORS = {
  0: 'red',
  1: 'blue',
  2: 'yellow',
  3: 'grey',
  4: 'white',
  5: 'brown',
}

export const ROLES = {
  PEASANT: 0,
  KNIGHT: 1,
  BISHOP: 2,
  CASTLE: 1000
}

export const ROLE_NAMES = {
  0:    'PEASANT',
  1:    'KNIGHT',
  2:    'BISHOP',
  1000: 'CASTLE',
}

export const ROLE_PRICES = {
  0: -1,
  1: 2,
  2: 3,
  1000: 0
}

// A kind of a state machine that should contain
// action to be performed on the next click
export const ROLE_STEPS = {
  0: ['move'],
  1: ['move2'],
  2: ['move', 'cast']
}