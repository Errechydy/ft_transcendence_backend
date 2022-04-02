export class CreateBanDto {
	banned: boolean;
	user_id: number;
	room_id: number;
	started_at: Date;
	duration: number;
}
