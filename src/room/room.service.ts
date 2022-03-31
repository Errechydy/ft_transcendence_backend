import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { CreateRoomMessageDto } from './dto/create-room-message.dto';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomMessage } from './entities/room-message.entity';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomService {


	constructor(
		@InjectRepository(Room)
		private roomsRepository: Repository<Room>,

		@InjectRepository(RoomMessage)
		private roomsMessagesRepository: Repository<RoomMessage>,
	) {}


	create(createRoomDto: CreateRoomDto) {
		const newRoom = this.roomsRepository.create(createRoomDto);
		return this.roomsRepository.save(newRoom);
	}

	// Get room messages list
	findRoomMessages(roomId: number) {
		// return this.roomsMessagesRepository.find({
		// 	room_id: roomId,
		// });
		return getConnection().query(`
			SELECT *  FROM
				public."room_message"
				JOIN
						public."user"
					ON
						public."user".id = public."room_message".from_id
				WHERE public."room_message".room_id = ${roomId}
		`);
	}

	// Save room message
	saveMessageToRoom(createRoomMessageDto: CreateRoomMessageDto) {
		const newRoom = this.roomsMessagesRepository.create(createRoomMessageDto);
		return this.roomsMessagesRepository.save(newRoom);
	}

	findAll() {
		return this.roomsRepository.find();
	}

	findOne(id: number) {
		return this.roomsRepository.findOne(id);
	}

	async update(id: number, updateRoomDto: UpdateRoomDto) {
		const room = await this.findOne(id);

		room.name = updateRoomDto.name;
		room.password = updateRoomDto.password;
		room.admins = updateRoomDto.admins;
		
		return this.roomsRepository.save(room);
	}

	async remove(id: number) {
		const room = await this.findOne(id);
		if(room)
			return this.roomsRepository.remove(room);
	}
	
}
