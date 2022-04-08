import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { BlockService } from './block.service';
import { CreateBlockDto } from './dto/create-block.dto';

@UseGuards(JwtAuthGuard)
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
		return this.blockService.blockedListUsers(sessionId); // Return list of all blocked users
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
