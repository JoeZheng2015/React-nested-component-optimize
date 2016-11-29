import React from 'react'
import connect from '../utils/connect'
import {smartSeatSelector} from '../selectors'
import {selectedColor} from '../utils/constants'

class Seat extends React.Component {
    constructor(args) {
        super(args)
        const {selected} = this.props
        this.state = {
            selected,
        }
    }

    componentDidUpdate() {
        console.timeEnd('update smartSeat')
    }

    onClick = id => {
        console.time('update smartSeat')

        this.props.selectSeat(id)
            .then(selectSuccess => {
                this.setState({
                    selected: selectSuccess,
                })
            })
    }

    render() {
        const {seat} = this.props
        const {selected} = this.state

        return (
            <li className="Seat"
                onClick={e => this.onClick(seat.id)}
                style={{background: selected ? selectedColor : seat.color}}></li>
        )
    }
}

class Seats extends React.Component {
    componentDidMount() {
        console.timeEnd('initial smartSeat')
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.seats.length !== this.props.seats.length
    }

    render() {
        console.time('initial smartSeat')
        const {seats, selectedSeatIds} = this.props

        return (
            <ul className="Seats SingleConnect">
                {
                    seats.map(seat => <Seat
                        key={seat.id}
                        seat={seat}
                        selected={selectedSeatIds.indexOf(seat.id) !== -1}
                        selectSeat={this.props.actions.selectSeatBySmartSeat}
                        />
                    )
                }
            </ul>
        )
    }
}

export default connect(smartSeatSelector)(Seats)

