import { Player, Room } from "./interfaces";

export class Rooms {
    rooms: Room[];
    constructor() {
        this.rooms = [];
    }

    addRoom(room: Room) {
        this.rooms.push(room);
    }

    addRooms(rooms: Room[]) {
        this.rooms.push(...rooms);
    }

    removeRoom(hostId: string) {
        const room = this.getRoom(hostId);

        if (room) {
            this.rooms = this.rooms.filter((r) => r.hostId !== hostId);
        }
        return room;
    }
    getRoom(hostId: string) {
        return this.rooms.filter((room) => room.hostId === hostId)[0]
    }
}

export class Players {
    players: Player[];
    constructor() {
        this.players = [];
    }
    addPlayer(player: Player) {
        this.players.push(player);
    }

    removePlayer(userId: string) {
        const player = this.getPlayer(userId);

        if (player) {
            this.players = this.players.filter((p) => p.userId !== userId);
        }
        return player;
    }
    getPlayer(userId: string) {
        return this.players.filter((p) => p.userId === userId)[0]
    }
}