export class CreateRoomDto {
	name: string;
	password: string;
	locked: boolean;
	owner_id: number;
	admins: number[];
}
