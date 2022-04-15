import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { BlockService } from 'src/block/block.service';
export declare class MessagesController {
    private readonly messagesService;
    private readonly blockService;
    constructor(messagesService: MessagesService, blockService: BlockService);
    create(createMessageDto: CreateMessageDto): Promise<import("./entities/message.entity").Message>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
