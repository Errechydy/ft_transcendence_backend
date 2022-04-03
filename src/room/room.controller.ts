import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ParseIntPipe } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { CreateRoomMessageDto } from './dto/create-room-message.dto';

@Controller('room')
export class RoomController {

  	constructor(private readonly roomService: RoomService) {}

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
		return this.roomService.update(+id, updateRoomDto);
	}

	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: string) {
		return this.roomService.remove(+id);
	}

	// Get room messages
	@Get(':roomId/messages')
	findRoomMessages(@Param('roomId', ParseIntPipe) roomId: string) {
		return this.roomService.findRoomMessages(+roomId);
	}

	// Save msg to room
	@Post(':roomId')
	saveMessageToRoom(@Param('roomId', ParseIntPipe) roomId: string, @Body() createRoomMessageDto: CreateRoomMessageDto) {
		const sessionId: number = 1;
		return this.roomService.saveMessageToRoom(sessionId, createRoomMessageDto);
	}
}
