import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

	/*
	// Save message
		- from_id, to_id, msg
	*/
	@Post()
	create(@Body() createMessageDto: CreateMessageDto) {
		const sessionId : number = 1;
		return this.messagesService.create(sessionId, createMessageDto);
	}

	// Display Users list with thier last msg
	@Get()
	findAll() {
		const sessionId : number = 1;
		return this.messagesService.getChatList(sessionId);
		// return this.messagesService.findAll();
	}

	// Get my messages with user (:id)
	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: string) {
		const sessionId : number = 1;
		return this.messagesService.findOne(sessionId, +id);
	}

	// Delete all messages that i've had with this user
	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: string) {
		const sessionId : number = 1;
		return this.messagesService.remove(sessionId, +id);
	}
}
