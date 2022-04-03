import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1'); // New
  app.useGlobalPipes(new ValidationPipe(
	  {
		  transform: true,
		  whitelist: true,
		  forbidNonWhitelisted: true,
		//   disableErrorMessages: true,

	  }
  ));
//   app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
