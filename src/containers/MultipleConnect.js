import React from 'react'
import connect from '../utils/connect'
import {multipleConnectSelector, makeMapStateToProps} from '../selectors'

class PureSeat extends React.Component {
    componentDidUpdate() {
        console.timeEnd('update multipleConnect')
    }
    render() {
        const {seat, selectSeat} = this.props

        return (
            <li className="Seat"
                onClick={e => selectSeat(seat.id)}
                style={{background: seat.selected ? seat.selectedColor : seat.originColor}}></li>
        )
    }
}
const Seat = connect(makeMapStateToProps)(PureSeat)

class Seats extends React.Component {
    selectSeat = id => {
        console.time('update multipleConnect')
        this.props.actions.selectSeat(id)
    }

    componentDidMount() {
        console.timeEnd('initial multipleConnect')
    }

    componentWillUnmount() {
        this.props.actions.resetSeat()
    }

    render() {
        console.time('initial multipleConnect')
        const {seatIds} = this.props

        return (
            <ul className="Seats">
                {
                    seatIds.map(id => <Seat
                        key={id}
                        id={id}
                        selectSeat={this.selectSeat}
                        />
                    )
                }
            </ul>
        )
    }
}

export default connect(multipleConnectSelector)(Seats)
