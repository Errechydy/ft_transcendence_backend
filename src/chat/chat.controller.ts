import { Controller, Get, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
	constructor(private readonly chatService: ChatService) {}

	
	@Get()
	getChatList() : any {
		return this.chatService.getChatList()
	}

	@Get(':userId')
	getMessagesWith(@Param('userId') userId: number) : any {
		console.log(userId);

		return this.chatService.getMessagesWith();

	}

	@Post()
	saveMessage(@Param('userId') userId: number) : any {
		console.log(userId);

		return this.chatService.getMessagesWith();

	}
}
