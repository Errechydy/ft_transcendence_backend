import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { BlockModule } from 'src/block/block.module';
import { ChatGateway } from './messages.gateway';

@Module({
	imports: [TypeOrmModule.forFeature([Message]), BlockModule],
	controllers: [MessagesController],
	providers: [MessagesService, ChatGateway]
})
export class MessagesModule {}
