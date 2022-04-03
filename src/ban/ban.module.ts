import { Module } from '@nestjs/common';
import { BanService } from './ban.service';
import { BanController } from './ban.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ban } from './entities/ban.entity';
import { RoomModule } from 'src/room/room.module';

@Module({
	imports: [TypeOrmModule.forFeature([Ban]), RoomModule],
	controllers: [BanController],
  	providers: [BanService]
})
export class BanModule {}
