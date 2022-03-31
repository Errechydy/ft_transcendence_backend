import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
		return this.messagesService.create(createMessageDto);
	}

	// Display Users list with thier last msg
	@Get()
	findAll() {
		return this.messagesService.getChatList();
		// return this.messagesService.findAll();
	}

	// Get my messages with user (:id)
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.messagesService.findOne(+id);
	}

	// Delete all messages that i've had with this user
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.messagesService.remove(+id);
	}
}
