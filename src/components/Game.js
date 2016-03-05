import React, { Component } from 'react'
import { connect } from 'react-redux'
import Cells from './Cells'
import Units from './Units'
import { begin } from '../actions'

const Game = class Game extends Component {
  render() {
    const {turn, onStartClick} = this.props
    return (
      <div>
        <div className='info'>
          <div>{`Player ${turn.player}`}</div>
          <div>{turn.step && `Step ${turn.step}`}</div>
          <div onClick={onStartClick}>
            {'Start'}
          </div>
          <Units/>
        </div>
        <Cells/>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    onStartClick: () => {
      dispatch(begin())
    }
  }
)

export default connect(state => state, mapDispatchToProps)(Game)
