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

export interface Bet {
    amount: Chip;
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
    | deleteRoomEventRequest;

export interface joinRoomEventRequest {
    roomPin: number;
    playerId: string;
    playerUserName: string | undefined;
}
export interface engageRoomRequest {
    roomPin: number;
    playerId: string;
    playerUserName: string | undefined;
}

export type interactWithRoomRequest =
    joinRoomEventRequest
    | engageRoomRequest;

export interface betRequest {
    roomPin: number;
    playerId: string;
    playerUserName: string | undefined;
    bet: Bet;
}