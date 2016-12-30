import React from 'react'
import connect from '../../utils/connect'
import {smartSeatSelector} from '../../selectors'

class Seat extends React.Component {
    constructor(args) {
        super(args)

        this.state = {
            selected: this.props.seat.selected,
        }
    }

    componentDidUpdate() {
        this.props.updateCallback(this.updateTime)
    }

    onClick = id => {
        this.updateTime = performance.now()

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
    updateId = 0
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

    updateCallback = (updateTime) => {
        const elapse = performance.now() - updateTime
        this.props.actions.setUpdateTime({
            elapse,
            updateId: ++this.updateId,
        })
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.seats.length !== this.props.seats.length
    }

    render() {
        const {seats} = this.props

        return (
            <ul className="Seats SingleConnect">
                {
                    seats.map(seat => <Seat
                        key={seat.id}
                        seat={seat}
                        selectSeat={this.props.actions.selectSeat}
                        updateCallback={this.updateCallback}
                        />
                    )
                }
            </ul>
        )
    }
}

export default connect(smartSeatSelector)(Seats)

