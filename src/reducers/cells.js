const n = 5
const r = 30
const r0 = r * Math.cos(Math.PI/6)
const directions = (() => Array.apply(null, Array(2)).map(
  (_, i) => (2 * Math.PI * i) / 6)
)()

const Utils = {
  oppositeSide: (side) => (side + 3) % 6
 ,getArrayElement: (a, i, j) => a[i] && a[i][j]
}

const Cell = (i, j) => {
  const x0 = (-2-n) * r0
  const y0 = 0
  const x = x0 + 2 * Math.cos(directions[0]) * r0 * j + i*r0
  const y = y0 + 2 * Math.sin(directions[1]) * r0 * i
  return {
    x: x * 2 / (n * 2 - 1),
    y: y * 2 / (n * 2 - 1) - 10,
    sides: [],
    role: null,
    player: null,
    connect : function(otherCell, toSide) {
      if (otherCell && !this.sides[toSide]) {
        this.sides[toSide] = otherCell;
        otherCell.sides[ Utils.oppositeSide(toSide) ] = this;
      }
    },
    getData: function() {
      return {
        cid: `${i}-${j}`,
        x: this.x,
        y: this.y,
        role: this.role,
        player: this.player,
        sides: this.sides,
      }
    }
  }
}

function createCells(n) {
  let a = []
  for (var i = 1; i < n*2; i++) {
    a[i] = []
    for (var j = 1; j < n*2; j++) {
      if (i + j <= n || i + j >= n*4 - n) {
        a[i][j] = undefined
      } else {
        a[i][j] = Cell(i, j)
      }
    }
  }
  for (var i = 1; i < n*2; i++) {
    for (var j = 1; j < n*2; j++) {
      if (i + j <= n || i + j >= n*4 - n) {

      } else {
        a[i][j].connect(Utils.getArrayElement(a, i, j+1), 0)
        a[i][j].connect(Utils.getArrayElement(a, i+1, j), 1)
        a[i][j].connect(Utils.getArrayElement(a, i+1, j-1), 2)
      }
    }
  }
  return a;
}

function getFlatCellsState(cells) {
  let newCells = [];
  for (var i = 1; i < n*2; i++) {
    for (var j = 1; j < n*2; j++) {
      const cell = Utils.getArrayElement(cells,i,j)
      if (cell) {
        newCells.push(cell.getData())
      }
    }
  }
  return newCells
}


const cell = (state, action) => {
  switch (action.type) {
    case 'BEGIN':
      /*
      Probably take [n - 1, 0] and [n - 1, (n * 2) - 2]
      Put
      {
        role: 'fortress',
        player '0' // '1'
      }
      */
      return state
    case 'PLACE_NEW_UNIT':
      if (state.cid !== action.cid) {
        return state
      }
      return {
        ...state,
        role: action.role,
        player: action.player
      }
    case 'SELECT_UNIT':
      return {
        ...state,
        selected: state.cid == action.cid
      }
    case 'MOVE_UNIT':
      if (state.selected) return {
        ...state,
        role: null,
        player: null,
        selected: false
      }
      if (state.cid === action.cid) return {
        ...state,
        role: action.role,
        player: action.player
      }
      return state
    default:
      return state
  }
}

const cells = (state, action) => {

  state = state || getFlatCellsState(createCells(n))

  switch (action.type) {
    case 'BEGIN':
      return state
    case 'SELECT_UNIT':
    case 'PLACE_NEW_UNIT':
    case 'MOVE_UNIT':
      return state.map(c =>
        cell(c, action)
      )
    default:
      return state
  }
}

export default cells
