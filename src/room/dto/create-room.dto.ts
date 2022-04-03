import { Exclude } from 'class-transformer';
import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Room } from '../entities/room.entity';


export class CreateRoomDto {

	@IsNotEmpty()
	@IsString()
	name: string;

	@Exclude()
	@IsNotEmpty()
	@IsString()
	password: string;

	@IsNotEmpty()
	@IsBoolean()
	locked: boolean;

	admins: number[] = [];

	constructor(partial: Partial<Room>) {
		Object.assign(this, partial);
	}
}
