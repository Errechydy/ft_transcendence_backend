import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { BlockService } from "src/block/block.service";
import { CreateMessageDto } from "./dto/create-message.dto";
import { MessagesService } from "./messages.service";

@WebSocketGateway(7000, {cors: true })
export class MessageGateway {

	constructor(
		private readonly blockService: BlockService,
		private readonly messagesService: MessagesService

	) {}

	@WebSocketServer()
	server;



	@SubscribeMessage('private-chat')
	async handleMessage(@MessageBody() payload: any ) {



		const sessionId : number = 2;
		const userBlockedList: number[] = await this.blockService.blockedList(payload.data.to);
		if(userBlockedList.includes(sessionId))
		{
			// console.log("blocked");
			return { status: false }
		}
		else
		{
			let messageDto = new CreateMessageDto();
			messageDto.to_id = payload.data.to;
			messageDto.msg = payload.data.message;
			this.messagesService.create(sessionId, messageDto);
			// this.server.to(payload.data.roomName).emit(payload.data.roomName, payload);
			this.server.emit(payload.data.roomName, payload);
			return { status: true }
		}
	}
}