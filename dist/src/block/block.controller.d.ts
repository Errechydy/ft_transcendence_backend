import { BlockService } from './block.service';
import { CreateBlockDto } from './dto/create-block.dto';
export declare class BlockController {
    private readonly blockService;
    constructor(blockService: BlockService);
    blockUser(createBlockDto: CreateBlockDto): Promise<import("./entities/block.entity").Block>;
    blockedList(): Promise<any>;
    unBlockUser(createBlockDto: CreateBlockDto): Promise<import("./entities/block.entity").Block>;
    isBlocked(id: string): Promise<{
        blocked: boolean;
    }>;
}
