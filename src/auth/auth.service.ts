import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
		
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	  ) {}

	async validateUser(username: string, pass: string): Promise<any> {
		const user = await this.usersService.findOne(1);
		if (user && user.password === pass) {
		  const { password, ...result } = user;
		  return result;
		}
		return null;
	  }

	async login(user: any)
	{
		const payload = { sub: user.id, joinedRooms: user.joinedRooms, username: user.username, avatar: user.avatar };

		

		return {
			access_token: this.jwtService.sign(payload),
		}
	}
}
