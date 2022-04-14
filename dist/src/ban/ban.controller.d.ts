import { RoomService } from 'src/room/room.service';
import { BanService } from './ban.service';
import { CreateBanDto } from './dto/create-ban.dto';
import { UpdateBanDto } from './dto/update-ban.dto';
export declare class BanController {
    private readonly banService;
    private roomService;
    constructor(banService: BanService, roomService: RoomService);
    create(createBanDto: CreateBanDto): Promise<import("./entities/ban.entity").Ban>;
    findAll(): Promise<import("./entities/ban.entity").Ban[]>;
    update(updateBanDto: UpdateBanDto): Promise<import("./entities/ban.entity").Ban>;
    roomBannedList(roomId: string): Promise<number[]>;
    findUserInRoom(roomId: string, userId: string): Promise<import("./entities/ban.entity").Ban>;
    unbanUserFromRoom(roomId: string, userId: string): Promise<import("./entities/ban.entity").Ban>;
}
