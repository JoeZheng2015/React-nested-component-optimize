const defaultOptions = {
    width: 20,
    height: 20,
    margin: 2,
}

export default class Seats {
    constructor(canvas, seats, selectedSeatIds, options = {}) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.seats = seats
        this.selectedSeatIds = selectedSeatIds
        this.options = {
            ...defaultOptions,
            ...options,
        }

        this.setCanvasSize()
        this.render()
    }
    setCanvasSize() {
        const {options, seats, canvas} = this
        const {width, height, margin} = options
        const windowWidth = window.innerWidth

        const totalWidth = width + margin
        const totalHeight = height + margin

        const columnNumber = Math.floor(windowWidth / totalWidth)
        this.columnNumber = columnNumber
        const rowNumber = Math.floor(seats.length / columnNumber) + 1

        canvas.width = windowWidth
        canvas.height = rowNumber * totalHeight
    }
    render() {
        const {ctx, seats, selectedSeatIds, columnNumber} = this

        for (let i = 0; i < seats.length; i++) {
            const row = Math.floor(i / columnNumber) + 1
            const column = (i % columnNumber) + 1
            const {x, y} = this.calculateCoordinate(row, column)
            console.log(x, y)
        }
    }

    calculateCoordinate(row, column) {
        const {width, height} = this.options

        const x = (column - 1) * width
        const y = (row - 1) * height

        return {x,y}
    }
}