export function selectSeat(id) {
    return (dispatch, getState) => {
        return lockSeat(id).then(res => {
            if (res) {
                const {seats, selectedSeatIds} = getState()
                const isLockSeat = selectedSeatIds.indexOf(id) === -1
                const {nextSeats, nextSelectedSeatIds} = computeNextState(seats, selectedSeatIds, id)

                dispatch({
                    type: 'SELECT_SEAT',
                    seats: nextSeats,
                    selectedSeatIds: nextSelectedSeatIds,
                })

                return isLockSeat
            }
        })
    }
}

export function resetSeat() {
    return {
        type: 'RESET',
    }
}

function lockSeat(id) {
    return Promise.resolve(true)
}

function computeNextState(seats, selectedSeatIds, id) {
    const index = selectedSeatIds.indexOf(id)
    let nextSelectedSeatIds

    if (index === -1) {
        nextSelectedSeatIds = [
            ...selectedSeatIds,
            id
        ]
    }
    else {
        nextSelectedSeatIds = [
            ...selectedSeatIds.slice(0, index),
            ...selectedSeatIds.slice(index + 1),
        ]
    }
    const nextSeat = Object.assign({}, seats[id], {
        selected: index === -1,
    })
    const nextSeats = [
        ...seats.slice(0, id),
        nextSeat,
        ...seats.slice(id + 1),
    ]

    return {
        nextSeats,
        nextSelectedSeatIds,
    }
}


