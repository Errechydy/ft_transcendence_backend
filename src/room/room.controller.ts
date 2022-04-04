import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ParseIntPipe, Inject, forwardRef, HttpException, HttpStatus } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { CreateRoomMessageDto } from './dto/create-room-message.dto';
import { BlockService } from 'src/block/block.service';
import { BanService } from 'src/ban/ban.service';

@Controller('room')
export class RoomController {

  	constructor(
		private readonly roomService: RoomService,
		private readonly blockService: BlockService,

		@Inject(forwardRef(() => BanService))
    	private banService: BanService,

	) {}

	@Post()
	create(@Body() createRoomDto: CreateRoomDto) {
		const sessionId : number = 1;
		return this.roomService.create(sessionId, createRoomDto);
	}

	@Get()
	findAll() {
		return this.roomService.findAll();
	}

	// TODO: should be protected : only edit only from room owner
	// @Get(':id')
	// findOne(@Param('id', ParseIntPipe) id: string) {
	// 	return this.roomService.findOne(+id);
	// }

	@Patch(':id')
	update(@Param('id', ParseIntPipe) id: string, @Body() updateRoomDto: UpdateRoomDto) {
		const sessionId: number = 1;
		return this.roomService.update(sessionId, +id, updateRoomDto);
	}

	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: string) {
		const sessionId: number = 1;
		return this.roomService.remove(sessionId, +id);
	}

	// Sould display room messages only if the room id exists in rooms[] jwt
	// Get room messages
	@Get(':roomId/messages')
	async findRoomMessages(@Param('roomId', ParseIntPipe) roomId: string) {
		const sessionId: number = 1;

		// my blocked list
		const myBlockedList: number[] = await this.blockService.blockedList(sessionId);

		// TODO : baned list : should include ids of all banned users of this room + muted list of this room that expired (created + banned.duration > date.now())
		
		
		const roomBannedList: number[] = await this.banService.roomBannedList(+roomId);

		const excludeUsersList = myBlockedList.concat(roomBannedList);

		return this.roomService.findRoomMessages(sessionId, excludeUsersList, +roomId);
	}

	// Sould display room messages only if the room id exists in rooms[] jwt
	// Save msg to room
	@Post(':roomId')
	saveMessageToRoom(@Param('roomId', ParseIntPipe) roomId: string, @Body() createRoomMessageDto: CreateRoomMessageDto) {
		const sessionId: number = 1;

		// Even if you're banned from this room, you still can send messages to this room as long as you joined it.

		return this.roomService.saveMessageToRoom(sessionId, createRoomMessageDto);
	}

	// Join this room
	@Get(':roomId/join')
	joinRoom(@Param('roomId', ParseIntPipe) roomId: string) {
		const sessionId: number = 1;

		// append it to rooms[roomId1, roomId2, ...] and store it in jwt token
		// if( already joined )
		// 	throw new HttpException({ message: 'You already joined this room!' }, HttpStatus.UNAUTHORIZED);
		// else
			return {
				"status": true
			}
	}

	// Leave this room
	@Get(':roomId/join')
	leaveRoom(@Param('roomId', ParseIntPipe) roomId: string) {
		const sessionId: number = 1;

		// remove the room id from rooms param that is stored in jwt token
		// if( not joined )
		// 	throw new HttpException({ message: 'You haven\'t joined this room to leave it!' }, HttpStatus.UNAUTHORIZED);
		// else
			return {
				"status": true
			}
	}
}
