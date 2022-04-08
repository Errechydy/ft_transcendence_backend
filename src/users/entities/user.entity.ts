import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	username: string;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column()
	avatar: string;

	@Column()
	twoWayAuth: boolean;

	@Column()
	password: string;


	@Column("int", { array: true })
	joinedRooms: number [] = [];


}