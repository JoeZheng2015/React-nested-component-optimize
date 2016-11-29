import { createSelector } from 'reselect'

export const singleConnectSelector = createSelector(
    state => state.singleConnect.seats,
    state => state.singleConnect.selectedSeatIds,
    (seats, selectedSeatIds) => {
        return {
            seats,
            selectedSeatIds,
        }
    }
)


export const multipleConnectSelector = createSelector(
    state => state.multipleConnect.seatIds,
    (seatIds) => {
        return {
            seatIds,
        }
    }
)

const getSeat = (state, id) => {
    return state.multipleConnect.seats[id]
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
    state => state.singleConnect.seats,
    state => state.singleConnect.selectedSeatIds,
    (seats, selectedSeatIds) => {
        return {
            seats,
            selectedSeatIds,
        }
    }
)

export const canvasSeatSelector = createSelector(
    state => state.singleConnect.seats,
    state => state.singleConnect.selectedSeatIds,
    (seats, selectedSeatIds) => {
        return {
            seats,
            selectedSeatIds,
        }
    }
)

