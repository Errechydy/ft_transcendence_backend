import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from '../orm-config';
import { ServeStaticModule} from '@nestjs/serve-static'; // static
import { join } from 'path'; // static
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { RoomModule } from './room/room.module';
import { BanModule } from './ban/ban.module';
import { BlockModule } from './block/block.module';

@Module({
	imports: [
		TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', '../static/dist'),
			exclude: ['/api*'],
		}),
		
		UsersModule,
		MessagesModule,
		RoomModule,
		BanModule,
		BlockModule,
	

	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
