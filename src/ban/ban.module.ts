import { forwardRef, Module } from '@nestjs/common';
import { BanService } from './ban.service';
import { BanController } from './ban.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ban } from './entities/ban.entity';
import { RoomModule } from 'src/room/room.module';

@Module({
	imports: [TypeOrmModule.forFeature([Ban]), forwardRef(() => RoomModule)],
	controllers: [BanController],
  	providers: [BanService],
	exports: [BanService]
})
export class BanModule {}
