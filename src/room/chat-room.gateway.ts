import { SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { BanService } from "src/ban/ban.service";
import { CreateRoomMessageDto } from "./dto/create-room-message.dto";
import { RoomService } from "./room.service";

@WebSocketGateway(8000, {cors: true })
export class ChatRoomGateway {

	constructor(
		private readonly banService: BanService,
		private readonly roomService: RoomService

	) {}

	@SubscribeMessage('chat-room')
	async handleMessage(client, payload: any ) {


		// banned list
		const sessionId : number = 2;

		const roomBannedList: number[] = await this.banService.roomBannedList(+payload.data.roomName);
		if(roomBannedList.includes(sessionId))
		{
			return { status: false } // console.log("blocked");
		}
		else
		{
			let messageDto = new CreateRoomMessageDto();
			messageDto.room_id = +payload.data.roomName;
			messageDto.msg = payload.data.message;
			this.roomService.saveMessageToRoom(sessionId, messageDto);

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

	@SubscribeMessage('leave-room')
	async leaveRoom(client, payload: any) {
		// TODO: join the room
		// if true
		{
			client.leave(payload.data.roomName);
			return { status: true }
		}
		// else
		{

			return { status: false }
		}
		
	}
	

}