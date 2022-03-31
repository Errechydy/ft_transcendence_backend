import { Module } from '@nestjs/common';
import { BlockService } from './block.service';
import { BlockController } from './block.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Block } from './entities/block.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Block])],
	controllers: [BlockController],
  	providers: [BlockService]
})
export class BlockModule {}
