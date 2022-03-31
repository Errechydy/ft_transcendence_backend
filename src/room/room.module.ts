import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { RoomMessage } from './entities/room-message.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Room, RoomMessage])],
	controllers: [RoomController],
  	providers: [RoomService]
})
export class RoomModule {}
