import React from 'react'
import connect from '../utils/connect'
import {canvasSeatSelector} from '../selectors'

const defaultSettings = {
    width: 20,
    height: 20,
    margin: 2,
}

class CanvasSeat extends React.Component {
    render() {
        return <canvas ref="canvas" onClick={this.onCanvasClick}></canvas>
    }
    componentDidMount() {
        const {seats, settings = {}} = this.props
        this.canvas = this.refs.canvas
        this.ctx = this.canvas.getContext('2d')
        this.settings = {
            ...defaultSettings,
            settings,
        }
        this.seatsMap = []
        this.seatCoordinate = {}

        this.draw(seats)
    }

    onCanvasClick = e => {
        const {pageX, pageY} = e
        const canvasOffset = this.getOffset(this.canvas)
        const pointX = pageX - canvasOffset.left
        const pointY = pageY - canvasOffset.top

        const time1 = performance.now()
        const index = this.findSeat({pointX, pointY})
        console.log('findSeat', performance.now() - time1)

        const time2 = performance.now()
        const hitedSeat = this.lookSeat({pointX, pointY})
        console.log('lookSeat', performance.now() - time2)

        if (hitedSeat) {
            this.props.handleClick(hitedSeat.id)
                .then(isLockSeat => {
                    this.updateSeat(hitedSeat, isLockSeat)
                })
        }
    }

    findSeat({pointX, pointY}) {
        const {seatsMap} = this

        for (let i = 0; i < seatsMap.length; i++) {
            const seatCoordinate = seatsMap[i]
            const {x, y, width, height, margin} = seatCoordinate

            if (hitRole({pointX, pointY, x, y, width, height, margin})) {
                return seatCoordinate
            }
        }
        return null

        function hitRole({pointX, pointY, x, y, width, height, margin}) {
            return pointX >= x &&
                pointX <= x + width + margin &&
                pointY >= y &&
                pointY <= y + height + margin
        }
    }

    lookSeat({pointX, pointY}) {
        const {settings, seatCoordinate} = this
        const {width, height, margin} = settings

        pointX = Math.floor(pointX / (width + margin))
        pointY = Math.floor(pointY / (height + margin))

        return seatCoordinate[`${pointX},${pointY}`]
    }
    getOffset(el) {
        let top = -el.offsetTop
        let left = -el.offsetLeft

        while(el = el.offsetParent) {
            top -= el.offsetTop
            left -= el.offsetLeft
        }

        return {
            top,
            left,
        }
    }
    draw(seats) {
        this.setCanvasSize(seats)
        const {columnNumber} = this
        const {width, height, margin} = this.settings

        for (let i = 0; i < seats.length; i++) {
            const row = Math.floor(i / columnNumber) + 1
            const column = (i % columnNumber) + 1
            const {x, y} = this.calculateCoordinate(row, column)
            const seat = {
                x,
                y,
                ...this.settings,
                ...seats[i],
            }
            this.drawSeat({
                ...seat,
                color: seat.selected ? seat.selectedColor : seat.originColor,
            })
            this.seatsMap.push(seat)
            const pointX = Math.floor(x / (width + margin))
            const pointY = Math.floor(y / (height + margin))
            this.seatCoordinate[`${pointX},${pointY}`] = seat
        }
    }
    drawSeat({x, y, width, height, color}) {
        const {ctx} = this

        ctx.fillStyle = color
        ctx.fillRect(x, y, width, height)
    }
    updateSeat(seat, isLockSeat) {
        const {ctx} = this
        const {x, y, width, height, selectedColor, originColor} = seat

        ctx.clearRect(x, y, width, height)
        this.drawSeat({
            ...seat,
            color: isLockSeat ? selectedColor : originColor,
        })
    }
    calculateCoordinate(row, column) {
        const {width, height, margin} = this.settings

        const x = (column - 1) * (width + margin)
        const y = (row - 1) * (height + margin)

        return {x,y}
    }
    setCanvasSize(seats) {
        const {canvas} = this
        const {width, height, margin} = this.settings
        const windowWidth = window.innerWidth

        const totalWidth = width + margin
        const totalHeight = height + margin

        const columnNumber = Math.floor(windowWidth / totalWidth)
        this.columnNumber = columnNumber
        const rowNumber = Math.floor(seats.length / columnNumber) + 1

        canvas.width = windowWidth
        canvas.height = rowNumber * totalHeight
    }
}


class CanvasSeatContainer extends React.Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.seats.length !== this.props.seats.length
    }

    componentDidMount() {
        console.timeEnd('initial canvasSeat')
    }

    componentWillUnmount() {
        this.props.actions.resetSeat()
    }

    render() {
        console.time('initial canvasSeat')
        const {seats} = this.props

        return <CanvasSeat seats={seats} handleClick={this.props.actions.selectSeat}></CanvasSeat>
    }
}
export default connect(canvasSeatSelector)(CanvasSeatContainer)
