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
  0: 'PEASANT',
  1: 'KNIGHT',
  2: 'BISHOP',
  1000: 'CASTLE',
}

export const SELECTABLE_ROLES = {
  0: true,
  1: true,
  2: true,
  1000: false,
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
  0: [
    {
      move: 'MOVE_UNIT',
      radius: 1,
      onVoid: true,
    }
  ],
  1: [
    {
      move: 'HORSE_JUMP',
      radius: 2,
      onVoid: true,
      onFoe: [0, 1, 2, 1000],
    }
  ],
  2: [
    {
      move: 'MOVE_UNIT',
      radius: 1,
      onVoid: true,
    },
    {
      move: 'PROSELYTIZE',
      radius: 1,
      onFoe: [0, 1, 2],
      optional: true,
    }
  ],
}

export const ROLE_DESCRIPTIONS = [
  'Peasants supply food for your army',
  'Knights can pass through your units and they can kill',
  'Bishops can entice enemy units, but they have to move first'
]

export const ROLE_UNITS_PER_TURN = [2, 1, 1]

export const ROLES_SUPPLY = [
  0,
  1000
]
