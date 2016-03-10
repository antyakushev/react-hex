import React, { Component } from 'react'
import { connect } from 'react-redux'
import Swipeable from 'react-swipeable'
import Cells from './Cells'
import Units from './Units'
import { begin } from '../actions'

const Game = class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rotation: 0
    }
    this.swiping = ::this.swiping
  }
  swiping(e, delta) {
    this.setState({rotation: this.state.rotation + delta / 60000})
  }
  render() {
    const {turn, onStartClick} = this.props
    return (
      <Swipeable onSwiping={this.swiping}>
      <div>
        <div className='info'>
          <div>{`Player ${turn.player}`}</div>
          <div>{turn.step && `Step ${turn.step}`}</div>
          <div onClick={onStartClick}>
            {'Start'}
          </div>
          <Units/>
        </div>
        <div style={{transform: `rotateX(45deg) rotateZ(${this.state.rotation}turn)`}}>
          <Cells/>
        </div>
      </div>
      </Swipeable>
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

export default connect((state, props) => ({...state, ...props}), mapDispatchToProps)(Game)
