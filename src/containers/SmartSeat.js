import React from 'react'
import connect from '../utils/connect'
import {smartSeatSelector} from '../selectors'

class Seat extends React.Component {
    constructor(args) {
        super(args)

        this.state = {
            selected: this.props.seat.selected,
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
                style={{background: selected ? seat.selectedColor : seat.originColor}}></li>
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

    componentWillUnmount() {
        this.props.actions.resetSeat()
    }

    render() {
        console.time('initial smartSeat')
        const {seats} = this.props

        return (
            <ul className="Seats SingleConnect">
                {
                    seats.map(seat => <Seat
                        key={seat.id}
                        seat={seat}
                        selectSeat={this.props.actions.selectSeat}
                        />
                    )
                }
            </ul>
        )
    }
}

export default connect(smartSeatSelector)(Seats)

