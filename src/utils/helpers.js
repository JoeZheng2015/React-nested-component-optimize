export function createSeats(seatLength = 100) {
    let seats = []
    for (let i = 0; i < seatLength; i++) {
        seats.push({
            id: i,
            color: 'gray',
        })
    }

    return seats
}
