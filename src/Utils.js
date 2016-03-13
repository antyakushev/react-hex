import { ROLE_STEPS, ROLE_UNITS_PER_TURN } from 'Consts'

// TODO: implement for more players
export const nextPlayer =
  (player) => player ? 0 : 1

export const joinClasses = function() {
  // NOTE: uses `arguments`, do not change to arrow function
  return Array.apply(null, arguments).filter((c) => c).join(' ')
}

export const isLastStep = (role, step) => (
  step === ROLE_UNITS_PER_TURN[role]
)

export const isLastCombatStep = (role, step) => (
  step === ROLE_STEPS[role].length
)
