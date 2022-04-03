import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { BanService } from './ban.service';
import { CreateBanDto } from './dto/create-ban.dto';
import { UpdateBanDto } from './dto/update-ban.dto';

@Controller('ban')
export class BanController {
	constructor(private readonly banService: BanService) {}

	@Post()
	create(@Body() createBanDto: CreateBanDto) {
		return this.banService.create(createBanDto);
	}

	@Get()
	findAll() {
		return this.banService.findAll();
	}

	@Patch()
	update(@Body() updateBanDto: UpdateBanDto) {
		return this.banService.update(updateBanDto);
	}

	@Get('room/:roomId/user/:userId')
	findUserInRoom(@Param('roomId', ParseIntPipe) roomId: string, @Param('userId', ParseIntPipe) userId: string) {
		return this.banService.findUserInRoom(+roomId, +userId);
	}

	@Delete('room/:roomId/user/:userId')
	unbanUserFromRoom(@Param('roomId', ParseIntPipe) roomId: string, @Param('userId', ParseIntPipe) userId: string) {
		return this.banService.unbanUserFromRoom(+roomId, +userId);
	}

}
