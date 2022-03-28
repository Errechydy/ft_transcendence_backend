import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { configService } from './config/config.service';

import { ServeStaticModule} from '@nestjs/serve-static'; // static
import { join } from 'path'; // static

@Module({
  imports: [
	TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
	ServeStaticModule.forRoot({
		rootPath: join(__dirname, '..', '../static/dist'),
		exclude: ['/api*'],
	  }),
	ChatModule,
	

	],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
