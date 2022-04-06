import { SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";

@WebSocketGateway(8000, {cors: true })
export class ChatRoomGateway {

/*	
	constructor(
		private readonly blockService: BlockService,
		private readonly messagesService: MessagesService

	) {}




	@SubscribeMessage('chat-room')
	async handleMessage(client, payload: any ) {



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

			payload.data.from = sessionId;


			client.broadcast.to(payload.data.roomName).emit("message", payload);
			return { status: true }
		}
	}

	@SubscribeMessage('join-room')
	async joinRoom(client, payload: any) {
		// TODO: join the room
		// if true
		{
			client.join(payload.data.roomName);
			return { status: true }
		}
		// else
		{

			return { status: false }
		}
		
	}
	*/

}