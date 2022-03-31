export class CreateBanDto {
	banned: boolean;
	user_id: number;
	room_id: number;
	msg: Date;
	duration: number;
}
