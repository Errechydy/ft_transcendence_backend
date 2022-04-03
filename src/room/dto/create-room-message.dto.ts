import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateRoomMessageDto {

	@IsNotEmpty()
	@IsInt()
	room_id: number;
	
	@IsNotEmpty()
	@IsString()
	msg: string;

	created: number = Date.now();
}
