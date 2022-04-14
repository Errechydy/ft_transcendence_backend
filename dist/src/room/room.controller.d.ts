import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { CreateRoomMessageDto } from './dto/create-room-message.dto';
import { BlockService } from 'src/block/block.service';
import { BanService } from 'src/ban/ban.service';
export declare class RoomController {
    private readonly roomService;
    private readonly blockService;
    private banService;
    constructor(roomService: RoomService, blockService: BlockService, banService: BanService);
    create(createRoomDto: CreateRoomDto): Promise<{
        status: boolean;
        roomData: import("./entities/room.entity").Room;
    } | {
        status: boolean;
        roomData?: undefined;
    }>;
    findAll(): Promise<import("./entities/room.entity").Room[]>;
    findOne(id: string): Promise<import("./entities/room.entity").Room>;
    update(id: string, updateRoomDto: UpdateRoomDto): Promise<import("./entities/room.entity").Room>;
    remove(id: string): Promise<import("./entities/room.entity").Room>;
    findRoomMessages(roomId: string): Promise<any>;
    saveMessageToRoom(roomId: string, createRoomMessageDto: CreateRoomMessageDto): Promise<import("./entities/room-message.entity").RoomMessage>;
    addRoomAdmin(roomId: string, data: string): Promise<{
        status: boolean;
    }>;
    removeRoomAdmin(roomId: string, data: string): Promise<{
        status: boolean;
    }>;
}
