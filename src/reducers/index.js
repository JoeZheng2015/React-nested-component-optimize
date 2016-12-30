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
    loadTime: undefined,
    updateTime: undefined,
    updateId: 0,
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
        case 'SET_INIT_TIME':
            return {
                ...state,
                loadTime: action.time,
            }
        case 'SET_UPDATE_TIME':
            return {
                ...state,
                updateTime: action.elapse,
                updateId: action.updateId,
            }
        default:
            return state
    }
}
