import React, { Component } from 'react'
import { connect } from 'react-redux'
import Swipeable from 'react-swipeable'
import styles from './style.css'
import { gameSelector } from 'selectors'
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
    const { turn, winner, onStartClick } = this.props
    return (
      <div>
        <div className={joinClasses(styles.startScreen, turn.started && styles.hidden)}>
          <div className={styles.startButton} onClick={onStartClick}>
          {'Start'}
          </div>
        </div>

        <Swipeable onSwiping={this.swiping}>
          <div className={styles.info}>
            {
              typeof winner === 'number' && (
                <div>
                  {`${PLAYER_COLORS[winner]} player won!`}
                </div>
              )
            }
            <div style={{ color: PLAYER_COLORS[turn.player] }}>
              {`${PLAYER_COLORS[turn.player]} player's turn`}
            </div>
            <div>
              {typeof turn.step === 'number' && `Step ${turn.step}`}
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

export default connect(gameSelector, mapDispatchToProps)(Game)
