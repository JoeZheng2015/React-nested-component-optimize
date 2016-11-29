const SEAT_LENGTH = 1000

let seats = []
for (let i = 0; i < SEAT_LENGTH; i++) {
    seats.push({
        id: i,
        selected: false,
        originColor: 'gray',
        selectedColor: 'red',
    })
}

const initialState = {
    seats,
    selectedSeatIds: [],
    seatIds: seats.map((seat, i) => i),
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SELECT_SEAT':
            return {
                ...state,
                seats: action.seats,
                selectedSeatIds: action.selectedSeatIds,
            }
        case 'RESET':
            return initialState
        default:
            return state
    }
}
