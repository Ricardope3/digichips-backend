import { Player, Room, Chip } from "../models/interfaces";

const chip: Chip = {
    value: 5,
}

const player1: Player = {
    _id: '1',
    userName: 'ricardo',
    points: [chip, chip],
}

const player2: Player = {
    _id: '2',
    userName: 'mani',
    points: [chip, chip, chip],
}

const player3: Player = {
    _id: '3',
    userName: 'quirino',
    points: [chip],
}

const players: Player[] = [player1, player2];
const allPlayers: Player[] = [player2, player3, player1];

const allRooms: Room[] = [
    { _id: '123', hostId: '1', players, pin: 123 },
    { _id: '124', hostId: '3', players: allPlayers, pin: 12 },
]

export {
    allPlayers, allRooms,
}