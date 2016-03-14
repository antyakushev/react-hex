import React, { Component } from 'react'
import { connect } from 'react-redux'
import Swipeable from 'react-swipeable'
import styles from './style.css'
import { begin } from 'actions'
import Cells from 'Cells'
import Units from 'Units'
import { joinClasses } from 'Utils'
import { PLAYER_COLORS } from 'Consts'

const Game = class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rotation: 0
    }
    this.swiping = ::this.swiping
  }
  swiping(e, delta) {
    this.setState({ rotation: this.state.rotation + delta / 60000 })
  }
  render() {
    const { turn, onStartClick } = this.props
    return (
      <div>
        <div className={joinClasses(styles.startScreen, turn.started && styles.hidden)}>
          <div className={styles.startButton} onClick={onStartClick}>
          {'Start'}
          </div>
        </div>

        <Swipeable onSwiping={this.swiping}>
          <div className={styles.info}>
            <div style={{ color: PLAYER_COLORS[turn.player] }}>
              {`Player ${turn.player}'s turn`}
            </div>
            <div>
              {turn.step && `Step ${turn.step}`}
            </div>
            <Units />
          </div>
          <div style={{ transform: `rotateX(45deg) rotateZ(${this.state.rotation}turn)` }}>
            <Cells />
          </div>
        </Swipeable>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    onStartClick: () => {
      dispatch(begin())
    }
  }
)

export default connect((state, props) => ({ ...state, ...props }), mapDispatchToProps)(Game)
