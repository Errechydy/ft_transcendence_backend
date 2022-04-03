import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
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


	create(sessionId: number, createRoomDto: CreateRoomDto) {
		const newRoom = this.roomsRepository.create(createRoomDto);
		newRoom.owner_id = sessionId;
		return this.roomsRepository.save(newRoom);
	}

	// Get room messages list
	async findRoomMessages(roomId: number) {
		if( isNaN(roomId) )
			throw new HttpException({ message: 'Room Not Found' }, HttpStatus.NOT_FOUND);
		const data = await getConnection().query(`
			SELECT *  FROM
				public."room_message"
				JOIN
						public."user"
					ON
						public."user".id = public."room_message".from_id
				WHERE public."room_message".room_id = ${roomId}
		`);
		if (!data)
			throw new HttpException({ message: 'Room Not Found' }, HttpStatus.NOT_FOUND);
		return data;
	}

	// Save room message
	saveMessageToRoom(sessionId: number, createRoomMessageDto: CreateRoomMessageDto) {
		const newRoom = this.roomsMessagesRepository.create(createRoomMessageDto);
		newRoom.from_id = sessionId;
		return this.roomsMessagesRepository.save(newRoom);
	}

	findAll() {
		return this.roomsRepository.find();
	}

	async findOne(id: number) {
		const data = await this.roomsRepository.findOne(id);
		if (!data)
			throw new HttpException({ message: 'Room Not Found' }, HttpStatus.NOT_FOUND);
		return data;
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
