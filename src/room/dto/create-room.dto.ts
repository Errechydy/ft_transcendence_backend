export class CreateRoomDto {
	name: string;
	password: string;
	owner_id: number;
	admins: number[];
}
