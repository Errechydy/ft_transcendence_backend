import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { CreateRoomMessageDto } from './dto/create-room-message.dto';

@Controller('room')
export class RoomController {

  	constructor(private readonly roomService: RoomService) {}

	@Post()
	create(@Body() createRoomDto: CreateRoomDto) {
		return this.roomService.create(createRoomDto);
	}

	@Get()
	findAll() {
		return this.roomService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.roomService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
		return this.roomService.update(+id, updateRoomDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.roomService.remove(+id);
	}

	// Get room messages
	@Get(':roomId/messages')
	findRoomMessages(@Param('roomId') roomId: string) {
		return this.roomService.findRoomMessages(+roomId);
	}

	// Save msg to room
	@Post(':roomId')
	saveMessageToRoom(@Param('roomId') roomId: string, @Body() createRoomMessageDto: CreateRoomMessageDto) {
		return this.roomService.saveMessageToRoom(createRoomMessageDto);
	}
}
