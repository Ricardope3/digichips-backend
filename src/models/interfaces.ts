export interface Chip {
    value: number;
}

export interface Player {
    _id: string;
    userName: string;
    points: Chip[];
}

export interface Room {
    _id: string;
    hostId: string;
    players: Player[];
}

export interface roomEventRequest {
    playerId: string;
    playerUserName: string | undefined;
}

export interface joinRoomEventRequest {
    roomId: string;
    playerId: string;
    playerUserName: string | undefined;
    sourceSocketId: string;
}
