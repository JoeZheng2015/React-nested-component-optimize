import { createSelector } from 'reselect'

const getSeats = state => state.seats
const getSeatIds = state => state.seatIds
const getSelectedSeatIds = state => state.selectedSeatIds

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
    return state.seats[id]
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

