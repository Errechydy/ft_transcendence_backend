import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from 'src/room/entities/room.entity';
import { RoomService } from 'src/room/room.service';
import { Repository } from 'typeorm';
import { CreateBanDto } from './dto/create-ban.dto';
import { UpdateBanDto } from './dto/update-ban.dto';
import { Ban } from './entities/ban.entity';

@Injectable()
export class BanService {

	constructor(
		@InjectRepository(Ban)
		private bansRepository: Repository<Ban>
	) {}


	async create(sessionId: number, roomData: Room, createBanDto: CreateBanDto) {

		// Get room owner ==> user_id != owner_id (you can't ban room's owner)
		if(roomData.admins.includes(sessionId))
			throw new HttpException({ message: 'You\'re not an admin of this room!' }, HttpStatus.UNAUTHORIZED);

		if(createBanDto.user_id == roomData.owner_id)
			throw new HttpException({ message: 'You can\'t ban the room crater!' }, HttpStatus.UNAUTHORIZED);

		const newBannedUser = this.bansRepository.create(createBanDto); // or create({ ....my data });
		
		const data = await this.bansRepository.save(newBannedUser); // insert Or update if it already exists

		return data;
		
	}

	findAll() {
		return this.bansRepository.find();
	}

	async findUserInRoom(roomId: number, userId: number) {
		const data = await this.bansRepository.findOne({
			room_id: roomId,
			user_id: userId,
		});
		if (!data)
			throw new HttpException({ error: 'User Not Found' }, HttpStatus.NOT_FOUND);

		return data;
	}

	async update(sessionId: number, roomData: Room, updateBanDto: UpdateBanDto) {

		if(roomData.admins.includes(sessionId))
			throw new HttpException({ message: 'You\'re not an admin of this room!' }, HttpStatus.UNAUTHORIZED);

		if(updateBanDto.user_id == roomData.owner_id)
			throw new HttpException({ message: 'You can\'t ban the room crater' }, HttpStatus.UNAUTHORIZED);

		const bannedUser = await this.findUserInRoom(updateBanDto.room_id, updateBanDto.user_id);

		if( bannedUser )
		{
			bannedUser.banned = updateBanDto.banned;
			bannedUser.duration = updateBanDto.duration;
			
			return this.bansRepository.save(bannedUser);
		}
		{
			throw new HttpException({ error: "Couldn't update, please try again later!" }, HttpStatus.NOT_MODIFIED);
		}
	}

	async unbanUserFromRoom(sessionId: number, roomData: Room , roomId: number, userId: number) {

		if(roomData.admins.includes(sessionId))
			throw new HttpException({ message: 'You\'re not an admin of this room!' }, HttpStatus.UNAUTHORIZED);

		const unBannedUser = await this.findUserInRoom(roomId, userId);
		if(unBannedUser)
		{
			return this.bansRepository.remove(unBannedUser);
		}
		else
		{
			throw new HttpException({ error: "Couldn't update, please try again later!" }, HttpStatus.NOT_MODIFIED);
		}
	}
}
