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
    pin: number;
    players: Player[];
}

export interface createRoomEventRequest {
    playerId: string;
    playerUserName: string | undefined;
}

export interface deleteRoomEventRequest {
    playerId: string;
    newRoomPin: number | undefined;
    playerUserName: string | undefined;
}

export type roomEventRequest =
    createRoomEventRequest
    & deleteRoomEventRequest;

export interface joinRoomEventRequest {
    roomPin: string;
    playerId: string;
    playerUserName: string | undefined;
}
export interface engageRoomRequest {
    roomPin: string;
    playerId: string;
    playerUserName: string | undefined;
}

export type interactWithRoomRequest =
    joinRoomEventRequest
    & engageRoomRequest;