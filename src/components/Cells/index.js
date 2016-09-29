import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './style.css'
import { clickCell, clickOutsideCell } from 'actions'
import { highlightedCellsSelector } from 'selectors'
import Cell from 'Cell'

class Cells extends Component {
  render() {
    const { cells, onCellClick, onOutsideCellClick } = this.props
    return (
      <div className={styles.cells}>
        {
          cells.map((c, i) =>
            <Cell
              key={i}
              {...c}
              onCellClick={onCellClick}
              onOutsideCellClick={onOutsideCellClick}
            />
          )
        }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    onCellClick: (cell, role, player) => (
      dispatch(clickCell(cell, role, player))
    ),
    onOutsideCellClick: (cell, role, player) => (
      dispatch(clickOutsideCell(cell, role, player))
    ),
  }
)

export default connect(highlightedCellsSelector, mapDispatchToProps)(Cells)
