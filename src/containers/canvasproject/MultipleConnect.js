import React from 'react'
import connect from '../../utils/connect'
import {multipleConnectSelector, makeMapStateToProps} from '../../selectors'

class PureSeat extends React.Component {
    componentDidUpdate() {
        this.props.updateCallback()
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
    updateId = 0
    selectSeat = id => {
        this.updateTime = performance.now()
        this.props.actions.selectSeat(id)
    }

    componentWillMount() {
        this.begin = performance.now()
    }

    componentDidMount() {
        const elapse = performance.now() - this.begin
        this.props.actions.setInitTime(elapse)
    }

    componentWillUnmount() {
        this.props.actions.resetSeat()
    }

    updateCallback = () => {
        const elapse = performance.now() - this.updateTime
        this.props.actions.setUpdateTime({
            elapse,
            updateId: ++this.updateId,
        })
    }

    shouldComponentUpdate(nextProps) {
        return this.props.seatIds.length !== nextProps.seatIds.length
    }

    render() {
        const {seatIds} = this.props

        return (
            <ul className="Seats">
                {
                    seatIds.map(id => <Seat
                        key={id}
                        id={id}
                        selectSeat={this.selectSeat}
                        updateCallback={this.updateCallback}
                        />
                    )
                }
            </ul>
        )
    }
}

export default connect(multipleConnectSelector)(Seats)
