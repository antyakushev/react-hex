import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './style.css'
import { clickCell } from 'actions'
import { highlightedCellsSelector } from 'selectors'
import Cell from 'Cell'

export default class Cells extends Component {
  render() {
    const { cells, onCellClick } = this.props
    return (
      <div className={styles.cells}>
        {
          cells.map((c, i) =>
            <Cell key={i} {...c} onCellClick={onCellClick} />
          )
        }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    onCellClick: (cell, role, player) => {
      dispatch(clickCell(cell, role, player))
    }
  }
)

export default connect(highlightedCellsSelector, mapDispatchToProps)(Cells)
