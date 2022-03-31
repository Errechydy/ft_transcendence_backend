import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
import { Block } from './entities/block.entity';

@Injectable()
export class BlockService {

	constructor(
		@InjectRepository(Block)
		private blocksRepository: Repository<Block>,
	) {}


	arrayRemove(users: number[], userId: number) { 
    
        return users.filter(function(ele){ 
            return ele != userId; 
        });
    }

	findUser(userId: number) {
		return this.blocksRepository.findOne({
			user_id: userId,
		});
	}

	async blockUser(createBlockDto: CreateBlockDto) {
		const userData = await this.findUser(createBlockDto.user_id);
		if( userData )
		{
			if( !userData.blocked.includes(createBlockDto.blocked) )
				userData.blocked.push(createBlockDto.blocked);
		
			return this.blocksRepository.save(userData);
		}
		else
		{

			let newUserData = this.blocksRepository.create();
			newUserData.user_id = createBlockDto.user_id;
			newUserData.blocked = [createBlockDto.blocked];
			return this.blocksRepository.save(newUserData);
		}
	}

	async unBlockUser(createBlockDto: CreateBlockDto) {
		const userData = await this.findUser(createBlockDto.user_id);
		if( userData )
			userData.blocked = this.arrayRemove(userData.blocked, createBlockDto.blocked);
	
		return this.blocksRepository.save(userData);
	}

	blockedList(myId: number) {

		return getConnection().query(`
			SELECT public."user".*  FROM
				public."block"
				JOIN
						public."user"
					ON
						public."user".id = ANY(public."block".blocked)
				WHERE public."block".user_id = ${myId}
		`);
	}

	

	async isBlocked(myId: number, userId: number): Promise<boolean> {
		const userData = await this.findUser(myId);
		if( userData && userData.blocked.includes(userId) )
			return true;
		else
			return false;
	}
}
