import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ValidationPipe, Inject, forwardRef, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { RoomService } from 'src/room/room.service';
import { BanService } from './ban.service';
import { CreateBanDto } from './dto/create-ban.dto';
import { UpdateBanDto } from './dto/update-ban.dto';

@UseGuards(JwtAuthGuard)
@Controller('ban')
export class BanController {
	constructor(
		private readonly banService: BanService,
		// private readonly roomService: RoomService

		@Inject(forwardRef(() => RoomService))
    	private roomService: RoomService,
	) {}

	@Post()
	async create(@Body() createBanDto: CreateBanDto) {
		const sessionId: number = 1;

		const roomData = await this.roomService.findOne(createBanDto.room_id);


		return this.banService.create(sessionId, roomData, createBanDto);
	}

	@Get()
	findAll() {
		return this.banService.findAll();
	}

	@Patch()
	async update(@Body() updateBanDto: UpdateBanDto) {
		const sessionId: number = 1;

		const roomData = await this.roomService.findOne(updateBanDto.room_id);

		return this.banService.update(sessionId, roomData, updateBanDto);
	}

	
	@Get('room/:roomId/banned')
	roomBannedList(@Param('roomId', ParseIntPipe) roomId: string) {
		return this.banService.roomBannedList(+roomId);
	}

	@Get('room/:roomId/user/:userId')
	findUserInRoom(@Param('roomId', ParseIntPipe) roomId: string, @Param('userId', ParseIntPipe) userId: string) {
		return this.banService.findUserInRoom(+roomId, +userId);
	}

	@Delete('room/:roomId/user/:userId')
	async unbanUserFromRoom(@Param('roomId', ParseIntPipe) roomId: string, @Param('userId', ParseIntPipe) userId: string) {
		const sessionId: number = 1;

		const roomData = await this.roomService.findOne(+roomId);

		return this.banService.unbanUserFromRoom(sessionId, roomData, +roomId, +userId);
	}

}
