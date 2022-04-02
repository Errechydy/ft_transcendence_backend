import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBanDto } from './dto/create-ban.dto';
import { UpdateBanDto } from './dto/update-ban.dto';
import { Ban } from './entities/ban.entity';

@Injectable()
export class BanService {

	constructor(
		@InjectRepository(Ban)
		private bansRepository: Repository<Ban>,
	) {}

	async create(createBanDto: CreateBanDto) {
		const newBannedUser = this.bansRepository.create(createBanDto); // or create({ ....my data });
		
		const data = await this.bansRepository.save(newBannedUser); // insert Or update if it already exists
		console.log(data);

		return data;
		
	}

	findAll() {
		return this.bansRepository.find();
	}

	findUserInRoom(roomId: number, userId: number) {
		return this.bansRepository.findOne({
			room_id: roomId,
			user_id: userId,
		});
	}

	async update(updateBanDto: UpdateBanDto) {
		const bannedUser = await this.findUserInRoom(updateBanDto.room_id, updateBanDto.user_id);

		if( bannedUser )
		{
			bannedUser.banned = updateBanDto.banned;
			bannedUser.duration = updateBanDto.duration;
			
			await this.bansRepository.save(bannedUser);
			return true;
		}
		{
			return false;
		}
	}

	async unbanUserFromRoom(roomId: number, userId: number) {
		const unBannedUser = await this.findUserInRoom(roomId, userId);
		if(unBannedUser)
		{
			await this.bansRepository.remove(unBannedUser);
			return true;
		}
		else
		{
			return false
		}
	}
}
