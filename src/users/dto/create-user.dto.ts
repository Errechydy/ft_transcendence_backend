import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {

	@IsNotEmpty()
	@IsString()
	username: string;

	@IsOptional()
	@IsNumber()
	win: number = 0;

	@IsOptional()
	@IsNumber()
	lost: number = 0;

	@IsOptional()
	@IsString()
	avatar: string = 'default-avatar.png';

	@IsBoolean()
	twoWayAuth: boolean = false;

	@IsNotEmpty()
	@IsString()
	password: string;

	@IsArray()
	joinedRoom: number[] = [];


}
