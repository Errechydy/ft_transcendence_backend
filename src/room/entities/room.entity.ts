import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Room {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({ default: '' })
	password: string;

	@Column("boolean", { default: false })
	locked: boolean;

	@Column()
	owner_id: number;

	@Column("int", { array: true })
	admins: number[];


}
