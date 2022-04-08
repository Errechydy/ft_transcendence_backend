import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {

	@IsNotEmpty()
	@IsString()
	username: string;

	@IsNotEmpty()
	@IsString()
	firstName: string;

	@IsNotEmpty()
	@IsString()
	lastName: string;

	@IsNotEmpty()
	@IsString()
	avatar: string;

	@IsBoolean()
	twoWayAuth: boolean = false;

	@IsNotEmpty()
	@IsString()
	password: string;

	@IsArray()
	joinedRoom: number[] = [];


}
