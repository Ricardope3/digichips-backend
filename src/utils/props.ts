import { Player, Room, Chip } from "../models/interfaces";

const chip: Chip = {
    value: 5,
}

const player1: Player = {
    userId: '1',
    userName: 'ricardo',
    points: [chip, chip],
}

const player2: Player = {
    userId: '2',
    userName: 'mani',
    points: [chip, chip, chip],
}

const player3: Player = {
    userId: '3',
    userName: 'quirino',
    points: [chip],
}

const players: Player[] = [player1, player2];
const allPlayers: Player[] = [player2, player3, player1];

const allRooms: Room[] = [
    { roomId: '123', hostId: '1', players },
    { roomId: '124', hostId: '3', players: allPlayers }
]

export {
    allPlayers, allRooms,
}