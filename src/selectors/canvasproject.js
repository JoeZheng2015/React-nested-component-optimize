import { createSelector } from 'reselect'

const getSeats = state => state.canvasproject.seats
const getSeatIds = state => state.canvasproject.seatIds
const getSelectedSeatIds = state => state.canvasproject.selectedSeatIds

export const singleConnectSelector = createSelector(
    getSeats,
    getSelectedSeatIds,
    (seats, selectedSeatIds) => {
        return {
            seats,
            selectedSeatIds,
        }
    }
)

export const multipleConnectSelector = createSelector(
    getSeatIds,
    (seatIds) => {
        return {
            seatIds,
        }
    }
)

const getSeat = (state, id) => {
    return state.canvasproject.seats[id]
}

const makeGetSeat = () => {
    return createSelector(
        getSeat,
        (seat) => {
            return {
                seat,
            }
        }
    )
}

export const makeMapStateToProps = (state, initialProps) => {
    const {id} = initialProps
    const getSeat = makeGetSeat()
    const mapStateToProps = (state) => getSeat(state, id)
    return mapStateToProps
}

export const smartSeatSelector = createSelector(
    getSeats,
    getSelectedSeatIds,
    (seats, selectedSeatIds) => {
        return {
            seats,
            selectedSeatIds,
        }
    }
)

export const canvasSeatSelector = createSelector(
    getSeats,
    getSelectedSeatIds,
    (seats, selectedSeatIds) => {
        return {
            seats,
            selectedSeatIds,
        }
    }
)

export const canvasProject = createSelector(
    state => state.canvasproject.loadTime,
    state => state.canvasproject.updateTime,
    state => state.canvasproject.updateId,
    (loadTime, updateTime, updateId) => {
        return {
            loadTime,
            updateTime,
            updateId,
        }
    }
)

