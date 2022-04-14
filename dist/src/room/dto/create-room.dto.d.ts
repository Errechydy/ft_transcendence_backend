import { Room } from '../entities/room.entity';
export declare class CreateRoomDto {
    name: string;
    password: string;
    locked: boolean;
    admins: number[];
    constructor(partial: Partial<Room>);
}
