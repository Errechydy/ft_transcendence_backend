import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Request, UseGuards, Inject, forwardRef, UseInterceptors, UploadedFile, Query, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../utils/file-upload.utils';
import { BlockService } from 'src/block/block.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

import jwt from '@nestjs/jwt'

@Controller('users')
export class UsersController {
	constructor(
		private readonly usersService: UsersService,
		private readonly blockService: BlockService,
		private authService: AuthService,
		private httpService: HttpService
	) {}



	// @Get('token')
	// token() {
	// 	const user = this.usersService.findOne(1);
	// 	return this.authService.login(user);
	// }


	@Post('register')
	createNewUser(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
	}




	@Get('callback')
	async create(@Query('code') code: string) {



		// return query['code'];
		const postData = {
			"grant_type": "authorization_code",
			"client_id": process.env['CLIENT_ID'],
			"client_secret": process.env['CLIENT_SECRET'],
			"code": code,
			"redirect_uri": "http://localhost:3000/login.html",
		}

		const newData =  await firstValueFrom(this.httpService.post(
			'https://api.intra.42.fr/oauth/token',
			postData
		)); // returns AxiosResponse




		const userData =  await firstValueFrom(this.httpService.get(
			'https://api.intra.42.fr/v2/me',
			{
				headers: { 'Authorization':  `Bearer ${newData.data['access_token']}` },
			}
		)); 

		// const user = get where id42 = userData['id'] // TODO
		let user = await this.usersService.findOne(1);
		if(user)
		{
			const { access_token } = await this.authService.login(user);
			return {
				registred: true,
				user: user,
				token: access_token
			};


		}
		else
		{
			const createUserDto = new CreateUserDto();
			createUserDto.username = userData.data['login'];
			user = await this.usersService.create(createUserDto);
			const { access_token } = await this.authService.login(user);
			return {
				registred: false,
				user: userData.data,
				token: access_token
			};
		}

		
	}


	@UseGuards(JwtAuthGuard)
	@Get()
	findAll() {
		return this.usersService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: string) {
		return this.usersService.findOne(+id);
	}

	@UseInterceptors(
		FileInterceptor('avatar', {
		  storage: diskStorage({
			destination: './static/dist/uploads/',
			filename: editFileName,
		  }),
		  fileFilter: imageFileFilter,
		}),
	  )
	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	update(@Param('id', ParseIntPipe) id: string, @Body() updateUserDto: UpdateUserDto, @UploadedFile() file: Express.Multer.File) {
		return this.usersService.update(+id, updateUserDto, file);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: string) {
		return this.usersService.remove(+id);
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id/current')
	async getCurrentLoggedinUser(@Request() req) {

		const sessionId: number = 1; // TODO: get it from jwt

		const blockedUsers = await this.blockService.blockedListUsers(sessionId);
		const blockedList: number[] = blockedUsers.map(a => a.id); // Select only id from the user object
		let userData = await this.usersService.findOne(sessionId);
		userData['blockedList'] = blockedList;

		return userData;
	}


}
