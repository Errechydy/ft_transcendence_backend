import { IsArray, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {

	@IsNotEmpty()
	@IsString()
	firstName: string;

	@IsNotEmpty()
	@IsString()
	lastName: string;



	@IsArray()
	joinedRoom: number[] = [];


}
