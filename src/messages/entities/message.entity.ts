

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Message {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	from_id: number;

	@Column()
	to_id: number;

	@Column()
	msg: string;

 	@Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
	timestamp: Date;


}
