import React from 'react'
import connect from '../utils/connect'
import {canvasSeatSelector} from '../selectors'
import {originColor, selectedColor} from '../utils/constants'

const defaultSettings = {
    width: 20,
    height: 20,
    margin: 2,
    color: originColor,
    selectedColor,
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

        this.draw(seats)
    }
    onCanvasClick = e => {
        const {pageX, pageY} = e
        const canvasOffset = this.getOffset(this.canvas)
        const pointX = pageX - canvasOffset.left
        const pointY = pageY - canvasOffset.top

        const hitedSeat = this.hitDetect({pointX, pointY})
        if (hitedSeat) {
            this.props.handleClick(hitedSeat.id)
                .then(isLockSeat => {
                    this.updateSeat(hitedSeat, isLockSeat)
                })
        }
    }

    hitDetect({pointX, pointY}) {
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
            this.drawSeat(seat)
            this.seatsMap.push(seat)
        }
    }
    drawSeat({x, y, width, height, color}) {
        const {ctx} = this

        ctx.fillStyle = color
        ctx.fillRect(x, y, width, height)
    }
    updateSeat(seat, isLockSeat) {
        const {ctx} = this
        const {x, y, width, height, selectedColor, color} = seat

        ctx.clearRect(x, y, width, height)
        this.drawSeat({
            ...seat,
            color: isLockSeat ? selectedColor : color,
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

    render() {
        const {seats} = this.props

        return <CanvasSeat seats={seats} handleClick={this.props.actions.selectSeatByCanvasSeat}></CanvasSeat>
    }
}
export default connect(canvasSeatSelector)(CanvasSeatContainer)
