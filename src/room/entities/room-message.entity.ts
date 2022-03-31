import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RoomMessage {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	room_id: number;

	@Column()
	from_id: number;

	@Column()
	msg: string;

	@Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
	timestamp: Date;


}
