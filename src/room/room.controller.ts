import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ParseIntPipe } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { CreateRoomMessageDto } from './dto/create-room-message.dto';
import { BlockService } from 'src/block/block.service';

@Controller('room')
export class RoomController {

  	constructor(
		private readonly roomService: RoomService,
		private readonly blockService: BlockService

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

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: string) {
		return this.roomService.findOne(+id);
	}

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

	// Get room messages
	@Get(':roomId/messages')
	async findRoomMessages(@Param('roomId', ParseIntPipe) roomId: string) {
		const sessionId: number = 1;

		// my blocked list
		const myBlockedList: number[] = await this.blockService.blockedList(sessionId);

		// TODO : baned list : should include ids of all banned users of this room + muted list of this room that expired (created + banned.duration > date.now())
		const roomBannedList: number[] = [];

		const excludeUsersList = myBlockedList.concat(roomBannedList);

		return this.roomService.findRoomMessages(sessionId, excludeUsersList, +roomId);
	}

	// Save msg to room
	@Post(':roomId')
	saveMessageToRoom(@Param('roomId', ParseIntPipe) roomId: string, @Body() createRoomMessageDto: CreateRoomMessageDto) {
		const sessionId: number = 1;
		return this.roomService.saveMessageToRoom(sessionId, createRoomMessageDto);
	}
}
