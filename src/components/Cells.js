import React, { Component } from 'react'
import { connect } from 'react-redux'
import { clickCell } from '../actions'
import Cell from './Cell'

export default class Cells extends Component {
  render() {
    const {cells, onCellClick} = this.props
    return (
      <div className='map'>
        {
          cells.map( (c,i) =>
            <Cell key={i} {...c} onCellClick={onCellClick}/>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = ({cells}) => (
  {
    cells
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    onCellClick: (cell, role, player) => {
      dispatch(clickCell(cell, role, player))
    }
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Cells)
