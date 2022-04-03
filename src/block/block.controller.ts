import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { BlockService } from './block.service';
import { CreateBlockDto } from './dto/create-block.dto';

@Controller('block')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

	@Post()
	blockUser(@Body() createBlockDto: CreateBlockDto) {
		const sessionId: number = 1; // TODO: get it from jwt
		return this.blockService.blockUser(sessionId, createBlockDto);
	}

	@Get('users')
	blockedList() {
		const sessionId: number = 1; // TODO: get it from jwt
		return this.blockService.blockedList(sessionId); // Return list of all blocked users
	}

	@Delete()
	unBlockUser(@Body() createBlockDto: CreateBlockDto) {
		const sessionId: number = 1; // TODO: get it from jwt
		return this.blockService.unBlockUser(sessionId, createBlockDto);
	}

	@Get(':id')
	isBlocked(@Param('id', ParseIntPipe) id: string) {
		const sessionId: number = 1; // TODO: get it from jwt
		return this.blockService.isBlocked(sessionId, +id);
	}
}
