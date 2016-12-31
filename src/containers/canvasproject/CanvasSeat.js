import React from 'react'
import connect from '../../utils/connect'
import {canvasSeatSelector} from '../../selectors'

class CanvasSeat extends React.Component {
    static defaultProps = {
        settings: {
            width: 20,
            height: 20,
            margin: 2,
        }
    }

    constructor(args) {
        super(args)

        this.seatHashByKey = {}
        this.seatIndexHashById = {}
        this.coordHashById = {}
        this.updateId = 0
    }

    componentWillMount() {
        this.begin = performance.now()
    }

    render() {
        return <canvas ref="canvas" onClick={this.onCanvasClick}></canvas>
    }

    componentDidMount() {
        this.initCanvas()

        const elapse = performance.now() - this.begin
        this.props.actions.setInitTime(elapse)
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.seats.length !== this.props.seats.length
    }

    componentWillUnmount() {
        this.props.actions.resetSeat()
    }

    componentWillReceiveProps(nextProps) {
        const {selectedSeatIds} = this.props

        if (selectedSeatIds !== nextProps.selectedSeatIds) {
            const {seatIndexHashById} = this
            const {seats} = nextProps

            const changedSeatIds = nextProps.selectedSeatIds.length > selectedSeatIds.length ?
                nextProps.selectedSeatIds.filter(id => selectedSeatIds.indexOf(id) === -1) :
                selectedSeatIds.filter(id => nextProps.selectedSeatIds.indexOf(id) === -1)

            changedSeatIds.forEach(id => {
                const index = seatIndexHashById[id]
                const seat = seats[index]
                this.drawSeat(seat)
            })

            this.updateCallback()
        }
    }

    updateCallback() {
        const elapse = performance.now() - this.updateTime
        this.props.actions.setUpdateTime({
            elapse,
            updateId: ++this.updateId,
        })
    }

    initCanvas() {
        this.canvas = this.refs.canvas
        this.ctx = this.canvas.getContext('2d')
        this.setCanvasSize()
        this.draw()
    }

    setCanvasSize() {
        const {canvas, ctx} = this
        const {seats, settings} = this.props
        const {width, height, margin} = settings
        const windowWidth = window.innerWidth

        const totalWidth = width + margin
        const totalHeight = height + margin

        const columnNumber = Math.floor(windowWidth / totalWidth)
        this.columnNumber = columnNumber
        const rowNumber = Math.floor(seats.length / columnNumber) + 1

        const canvasWidth = windowWidth
        const canvasHeight = rowNumber * totalHeight

        const devicePixelRatio = window.devicePixelRatio || 1

        canvas.width = canvasWidth * devicePixelRatio
        canvas.height = canvasHeight * devicePixelRatio
        ctx.scale(devicePixelRatio, devicePixelRatio)

        canvas.style.width = `${canvasWidth}px`
        canvas.style.height = `${canvasHeight}px`
    }

    onCanvasClick = e => {
        this.updateTime = performance.now()

        const {pageX, pageY} = e

        const canvasOffset = this.getOffset(this.canvas)
        const pointX = pageX + canvasOffset.left
        const pointY = pageY + canvasOffset.top

        const seat = this.lookupSeat({pointX, pointY})

        if (seat) {
            this.props.actions.selectSeat(seat.id)
        }
    }

    lookupSeat({pointX, pointY}) {
        const {seatHashByKey} = this
        const {width, height, margin} = this.props.settings

        const row = Math.floor(pointY / (height + margin)) + 1
        const column = Math.floor(pointX / (width + margin)) + 1

        return seatHashByKey[`${row},${column}`]
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

    draw() {
        const {columnNumber} = this
        const {seats} = this.props

        for (let i = 0; i < seats.length; i++) {
            const row = Math.floor(i / columnNumber) + 1
            const column = (i % columnNumber) + 1
            const seat = seats[i]

            const hashKey = `${row},${column}`
            // 根据key可以找到seat
            this.seatHashByKey[hashKey] = seat
            // 根据id可以找到seat
            this.seatIndexHashById[seat.id] = i
            // 根据id可以找到坐标
            this.coordHashById[seat.id] = {row, column}

            this.drawSeat(seat)
        }
    }

    drawSeat(seat) {
        const {ctx, coordHashById} = this
        const {id, selected, selectedColor, originColor} = seat
        const {row, column} = coordHashById[id]
        const {width, height, margin} = this.props.settings

        const x = (column - 1) * (width + margin)
        const y = (row - 1) * (height + margin)

        ctx.fillStyle = selected ? selectedColor : originColor
        ctx.fillRect(x, y, width, height)
    }
}

export default connect(canvasSeatSelector)(CanvasSeat)
