import { ROLE_STEPS, ROLE_UNITS_PER_TURN } from 'Consts'

// TODO: implement for more players
export const nextPlayer =
  (player) => player ? 0 : 1

export const joinClasses = (...args) => {
  return Array.apply(null, args).filter((c) => c).join(' ')
}

export const isLastStep = (role, step) => (
  step === ROLE_UNITS_PER_TURN[role]
)

export const isLastCombatStep = (role, step) => (
  step === ROLE_STEPS[role].length
)
