import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { RoomMessage } from './entities/room-message.entity';
import { BlockModule } from 'src/block/block.module';
import { BanModule } from 'src/ban/ban.module';
import { ChatGateway } from './chat.gateway';

@Module({
	imports: [TypeOrmModule.forFeature([Room, RoomMessage]), BlockModule, BanModule],
	controllers: [RoomController],
  	providers: [RoomService, ChatGateway],
  	exports: [RoomService]
})
export class RoomModule {}
