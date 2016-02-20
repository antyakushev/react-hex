// TODO: implement for more players
export const nextPlayer =
  (player) => player ? 1 : 0
  
export const joinClasses = function() {
  return Array.apply(null, arguments).filter((c) => c).join(' ')
}
