
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ban {
	@PrimaryGeneratedColumn()
	id: number;

	@Column('boolean', {default: false})
	banned: boolean;

	@Column()
	user_id: number;

	@Column()
	room_id: number;

 	@Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
	started_at: Date;

	@Column('int',  {default: '0'})
	duration: number;
}
