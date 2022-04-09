import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	username: string;

	@Column('int', {default: 0})
	win: number;

	@Column('int', {default: 0})
	lost: number;

	@Column()
	avatar: string;

	@Column()
	twoWayAuth: boolean;

	@Column()
	password: string;


	@Column("int", { array: true })
	joinedRooms: number [] = [];


}