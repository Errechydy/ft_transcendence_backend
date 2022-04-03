import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { RoomMessage } from './entities/room-message.entity';
import { BlockModule } from 'src/block/block.module';

@Module({
	imports: [TypeOrmModule.forFeature([Room, RoomMessage]), BlockModule],
	controllers: [RoomController],
  	providers: [RoomService],
  	exports: [RoomService]
})
export class RoomModule {}
