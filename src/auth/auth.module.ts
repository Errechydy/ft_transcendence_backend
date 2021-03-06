import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
require('dotenv').config();

@Module({
	imports: [
		forwardRef(() => UsersModule),
		PassportModule,
		JwtModule.register({
			secret: process.env['JWTSECRET'],
			signOptions: { expiresIn: '30d' }
		})
	],
  	providers: [AuthService, JwtStrategy],
  	exports: [AuthService],
})
export class AuthModule {}
