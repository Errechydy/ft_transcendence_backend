import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { BlockModule } from 'src/block/block.module';
import { HttpModule } from '@nestjs/axios';
require('dotenv').config()

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
		AuthModule,
		BlockModule,
		HttpModule.register({
			timeout: 5000,
			maxRedirects: 5,
		}),
	],
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService]
})
export class UsersModule {}
