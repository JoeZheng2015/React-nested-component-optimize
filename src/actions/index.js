import {originColor, selectedColor} from '../utils/constants'

export function selectSeatBySingleConnect(id) {
    return (dispatch, getState) => {
        lockSeat(id).then(res => {
            if (res) {
                const {seats, selectedSeatIds} = getState().singleConnect
                const {nextSeats, nextSelectedSeatIds} = selectSeat(seats, selectedSeatIds, id)

                dispatch({
                    type: 'SELECT_SEAT_BY_SINGLECONNECT',
                    seats: nextSeats,
                    selectedSeatIds: nextSelectedSeatIds,
                })
            }
        })
    }
}

// const TYPE = {
//     multipleConnect: 'MULTIPLECONNECT',
//     singleConnect: 'SINGLECONNECT',
//     smartSeat: 'SMARTSEAET',
//     canvasSeat: 'CANVASSEAT',
// }

// export function selectSeatAccordingType(id, type) {
//     return (dispatch, getState) => {
//         lockSeat(id).then(res => {
//             if (res) {
//                 const {seats, selectedSeatIds} = getState()[type]
//                 const {nextSeats, nextSelectedSeatIds} = selectSeat(seats, selectedSeatIds, id)

//                 dispatch({
//                     type: `SELECT_SEAT_BY_${TYPE[type]}`,
//                     seats: nextSeats,
//                     selectedSeatIds: nextSelectedSeatIds,
//                 })
//             }
//         })
//     }
// }

export function selectSeatByMultipleConnect(id) {
    return (dispatch, getState) => {
        lockSeat(id).then(res => {
            if (res) {
                const {seats, selectedSeatIds} = getState().multipleConnect
                const {nextSeats, nextSelectedSeatIds} = selectSeat(seats, selectedSeatIds, id)

                dispatch({
                    type: 'SELECT_SEAT_BY_MULTIPLECONNECT',
                    seats: nextSeats,
                    selectedSeatIds: nextSelectedSeatIds,
                })
            }
        })
    }
}

export function selectSeatBySmartSeat(id) {
    return (dispatch, getState) => {
        return lockSeat(id).then(res => {
            if (res) {
                const {seats, selectedSeatIds} = getState().smartSeat
                const isLockSeat = selectedSeatIds.indexOf(id) === -1
                const {nextSeats, nextSelectedSeatIds} = selectSeat(seats, selectedSeatIds, id)

                dispatch({
                    type: 'SELECT_SEAT_BY_SMARTSEAT',
                    seats: nextSeats,
                    selectedSeatIds: nextSelectedSeatIds,
                })

                return isLockSeat
            }
        })
    }
}

export function selectSeatByCanvasSeat(id) {
    return (dispatch, getState) => {
        return lockSeat(id).then(res => {
            if (res) {
                const {seats, selectedSeatIds} = getState().canvasSeat
                const isLockSeat = selectedSeatIds.indexOf(id) === -1
                const {nextSeats, nextSelectedSeatIds} = selectSeat(seats, selectedSeatIds, id)

                dispatch({
                    type: 'SELECT_SEAT_BY_CANVASSEAT',
                    seats: nextSeats,
                    selectedSeatIds: nextSelectedSeatIds,
                })
                console.log(isLockSeat)
                return isLockSeat
            }
        })
    }
}

function lockSeat(id) {
    return Promise.resolve(true)
}

function selectSeat(seats, selectedSeatIds, id) {
    const index = selectedSeatIds.indexOf(id)
    let nextSelectedSeatIds
    let nextSeats

    if (index === -1) {
        nextSelectedSeatIds = [
            ...selectedSeatIds,
            id
        ]
        const nextSeat = Object.assign({}, seats[id], {
            color: selectedColor,
        })
        nextSeats = [
            ...seats.slice(0, id),
            nextSeat,
            ...seats.slice(id + 1),
        ]
    }
    else {
        nextSelectedSeatIds = [
            ...selectedSeatIds.slice(0, index),
            ...selectedSeatIds.slice(index + 1),
        ]
        const nextSeat = Object.assign({}, seats[id], {
            color: originColor,
        })
        nextSeats = [
            ...seats.slice(0, id),
            nextSeat,
            ...seats.slice(id + 1),
        ]
    }

    return {
        nextSeats,
        nextSelectedSeatIds,
    }
}


