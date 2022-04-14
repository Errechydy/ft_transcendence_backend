import { BanService } from "src/ban/ban.service";
import { UsersService } from "src/users/users.service";
import { RoomService } from "./room.service";
export declare class ChatRoomGateway {
    private readonly banService;
    private readonly roomService;
    private readonly usersService;
    constructor(banService: BanService, roomService: RoomService, usersService: UsersService);
    handleMessage(client: any, payload: any): Promise<{
        status: boolean;
    }>;
    joinRoom(client: any, payload: any): Promise<{
        status: boolean;
    }>;
    joinRoomM(client: any, payload: any): Promise<void>;
    leaveRoom(client: any, payload: any): Promise<{
        status: boolean;
    }>;
}
