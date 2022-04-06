import { SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { BanService } from "src/ban/ban.service";
import { UsersService } from "src/users/users.service";
import { CreateRoomMessageDto } from "./dto/create-room-message.dto";
import { RoomService } from "./room.service";

@WebSocketGateway(8000, {cors: true })
export class ChatRoomGateway {

	constructor(
		private readonly banService: BanService,
		private readonly roomService: RoomService,
		private readonly usersService: UsersService

	) {}

	@SubscribeMessage('chat-room')
	async handleMessage(client, payload: any ) {

		const sessionId : number = 2;


		// banned list
		

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
		// get room data (if it's private or public)
		const roomData = await this.roomService.findOne(payload.data.roomName);
		if ( !roomData.locked )
		{
			const sessionId : number = 2;
			this.usersService.joinRoom(+sessionId, roomData.id);
			client.join(payload.data.roomName);
			return { status: true }
		}
		else
		{
			return { status: false }
		}
		
	}

	@SubscribeMessage('leave-room')
	async leaveRoom(client, payload: any) {
		// TODO: join the room
		const sessionJoinedRooms: number[] = [1, 3, 4];
		
		if ( sessionJoinedRooms.includes(+payload.data.roomName) )
		{
			const sessionId : number = 2;
			this.usersService.leaveRoom(+sessionId, +payload.data.roomName);
			client.leave(payload.data.roomName);
			return { status: true }
		}
		else
		{
			return { status: false }
		}
		
	}
	

}