import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Request, UseGuards, Inject, forwardRef, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../utils/file-upload.utils';

@Controller('users')
export class UsersController {
	constructor(
		private readonly usersService: UsersService,
		private authService: AuthService
	) {}

	@Post('register')
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
	}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login( @Request() req ) {
		return this.authService.login(req.user);
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
	getCurrentLoggedinUser(@Request() req) {

		return this.usersService.findOne(+req.user.id);
	}


}
