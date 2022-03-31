import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BlockService } from './block.service';
import { CreateBlockDto } from './dto/create-block.dto';

@Controller('block')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

	@Post()
	blockUser(@Body() createBlockDto: CreateBlockDto) {
		const myId = 1; // TODO: get it from jwt
		if(createBlockDto.user_id == myId)
			return this.blockService.blockUser(createBlockDto);
	}

	@Get('users')
	blockedList() {
		const myId = 1; // TODO: get it from jwt
		return this.blockService.blockedList(myId); // Return list of all blocked users
	}

	@Delete()
	unBlockUser(@Body() createBlockDto: CreateBlockDto) {
		const myId = 1; // TODO: get it from jwt
		if(createBlockDto.user_id == myId)
			return this.blockService.unBlockUser(createBlockDto);
	}

	@Get(':id')
	isBlocked(@Param('id') id: string) {
		const myId = 1; // TODO: get it from jwt
		return this.blockService.isBlocked(myId, +id);
	}
}
