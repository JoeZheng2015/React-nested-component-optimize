import React from 'react'
import connect from '../utils/connect'
import {singleConnectSelector} from '../selectors'

class Seat extends React.Component {
    componentDidUpdate() {
        console.timeEnd('update singleConnect')
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
    selectSeat = id => {
        console.time('update singleConnect')
        this.props.actions.selectSeat(id)
    }

    componentDidMount() {
        console.timeEnd('initial singleConnect')
    }

    componentWillUnmount() {
        this.props.actions.resetSeat()
    }

    render() {
        console.time('initial singleConnect')
        const {seats} = this.props

        return (
            <ul className="Seats SingleConnect">
                {
                    seats.map(seat => <Seat
                        key={seat.id}
                        seat={seat}
                        selectSeat={this.selectSeat}
                        />
                    )
                }
            </ul>
        )
    }
}

export default connect(singleConnectSelector)(Seats)

