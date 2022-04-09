import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ParseIntPipe, Inject, forwardRef, HttpException, HttpStatus, ClassSerializerInterceptor, UseGuards } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { CreateRoomMessageDto } from './dto/create-room-message.dto';
import { BlockService } from 'src/block/block.service';
import { BanService } from 'src/ban/ban.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('room')
export class RoomController {

  	constructor(
		private readonly roomService: RoomService,
		private readonly blockService: BlockService,

		@Inject(forwardRef(() => BanService))
    	private banService: BanService,

	) {}

	@UseInterceptors(ClassSerializerInterceptor)
	@Post()
	create(@Body() createRoomDto: CreateRoomDto) {
		const sessionId : number = 1;
		return this.roomService.create(sessionId, createRoomDto);
	}

	@UseInterceptors(ClassSerializerInterceptor)
	@Get()
	findAll() {
		return this.roomService.findAll();
	}

	// TODO: should be protected : only edit only from room owner
	// @Get(':id')
	// findOne(@Param('id', ParseIntPipe) id: string) {
	// 	return this.roomService.findOne(+id);
	// }

	@UseInterceptors(ClassSerializerInterceptor)
	@Patch(':id')
	update(@Param('id', ParseIntPipe) id: string, @Body() updateRoomDto: UpdateRoomDto) {
		const sessionId: number = 1;
		return this.roomService.update(sessionId, +id, updateRoomDto);
	}

	@UseInterceptors(ClassSerializerInterceptor)
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

		return this.roomService.findRoomMessages(sessionId, myBlockedList, +roomId);
	}

	// Save msg to room
	// Sould display room messages only if the room id exists in rooms[] jwt
	@Post(':roomId')
	async saveMessageToRoom(@Param('roomId', ParseIntPipe) roomId: string, @Body() createRoomMessageDto: CreateRoomMessageDto) {
		const sessionId: number = 1;

		const roomBannedList: number[] = await this.banService.roomBannedList(+roomId);
		if(roomBannedList.includes(sessionId))
			throw new HttpException({ message: 'You can\'t participate in this room' }, HttpStatus.UNAUTHORIZED);

		return this.roomService.saveMessageToRoom(sessionId, createRoomMessageDto);
	}

}
