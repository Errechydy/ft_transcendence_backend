import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Room {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	password: string;

	@Column()
	locked: boolean;

	@Column()
	owner_id: number;

	@Column("int", { array: true })
	admins: number[];


}
