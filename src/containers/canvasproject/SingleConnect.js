import React from 'react'
import connect from '../../utils/connect'
import {singleConnectSelector} from '../../selectors'

class Seat extends React.Component {
    componentDidUpdate() {
        this.props.updateCallback()
    }
    
    shouldComponentUpdate(nextProps) {
        const {seat} = this.props

        return nextProps.seat.id !== seat.id ||
            nextProps.seat.selected !== seat.selected
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

    render() {
        const {seats} = this.props

        return (
            <ul className="Seats SingleConnect">
                {
                    seats.map(seat => <Seat
                        key={seat.id}
                        seat={seat}
                        selectSeat={this.selectSeat}
                        updateCallback={this.updateCallback}
                        />
                    )
                }
            </ul>
        )
    }
}

export default connect(singleConnectSelector)(Seats)

