import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { ServeStaticModule} from '@nestjs/serve-static'; // static
import { join } from 'path'; // static
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';

@Module({
	imports: [
		TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', '../static/dist'),
			exclude: ['/api*'],
		}),
		
		UsersModule,
		MessagesModule,
	

	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
