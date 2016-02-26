import React, { Component } from 'react'
import { connect } from 'react-redux'
import Cells from './Cells'
import Units from './Units'

const Game = class Game extends Component {
  render() {
    const {turn} = this.props
    return (
      <div>
        <div className='info'>
          <div>{`Player ${turn.player}`}</div>
          <div>{turn.step && `Step ${turn.step}`}</div>
          <Units/>
        </div>
        <Cells/>
      </div>
    );
  }
}

export default connect(state => state)(Game)
