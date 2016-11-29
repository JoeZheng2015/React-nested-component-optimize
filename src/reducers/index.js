import {createSeats} from '../utils/helpers'
const SEAT_LENGTH = 1000

const multipleConnectSeats = createSeats(SEAT_LENGTH)
const initialState = {
    singleConnect: {
        seats: createSeats(SEAT_LENGTH),
        selectedSeatIds: [],
    },
    multipleConnect: {
        seats: multipleConnectSeats,
        seatIds: multipleConnectSeats.map((seat, i) => i),
        selectedSeatIds: [],
    },
    smartSeat: {
        seats: createSeats(SEAT_LENGTH),
        selectedSeatIds: [],
    },
    canvasSeat: {
        seats: createSeats(SEAT_LENGTH),
        selectedSeatIds: [],
    },
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SELECT_SEAT_BY_SINGLECONNECT':
            return helper('singleConnect')
        case 'SELECT_SEAT_BY_MULTIPLECONNECT':
            return helper('multipleConnect')
        case 'SELECT_SEAT_BY_SMARTSEAT':
            return helper('smartSeat')
        case 'SELECT_SEAT_BY_CANVASSEAT':
            return helper('canvasSeat')
        default:
            return state
    }

    function helper(reducer) {
        const nextState = {
            ...state[reducer],
            seats: action.seats,
            selectedSeatIds: action.selectedSeatIds,
        }

        return {
            ...state,
            [reducer]:nextState,
        }
    }
}
