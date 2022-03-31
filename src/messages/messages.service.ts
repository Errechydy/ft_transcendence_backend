import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, getConnection, Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {

	constructor(
		@InjectRepository(Message)
		private messageRepository: Repository<Message>,
	) {}
		
	create(createMessageDto: CreateMessageDto) {
		// TODO: get myId from jwt token
		createMessageDto.from_id = 1;
		const newMessage = this.messageRepository.create(createMessageDto);
		return this.messageRepository.save(newMessage);
	}


	findOne(id: number) {
		// TODO: get myId from jwt token
		const myId:number = 1;

		return this.messageRepository.createQueryBuilder('message')
			.where(new Brackets(qb => {
				qb.where('from_id = :id', {
					id: id,
				});
				qb.andWhere('to_id = :id2', {
					id2: myId,
				});                               
			}))
			.orWhere(new Brackets(qb => {
				qb.where('to_id = :id3', {
					id3: id,
				});
				qb.andWhere('from_id = :id4', {
					id4: myId,
				});                               
			}))
			.getMany();
		
	}

	async getChatList() {
		// TODO: get myId from jwt token
		const myId:number = 1;

		return getConnection().query(`
			SELECT * FROM
				public."message"
					INNER JOIN
							public."user"
						ON
							( public."message".from_id = public."user".id AND public."message".from_id != ${myId} )
							OR 
							( public."message".to_id = public."user".id AND public."message".to_id != ${myId} )
					INNER JOIN 
							(
								SELECT user_id, max(timestamp) m FROM
								(
									SELECT id, to_id user_id, timestamp FROM
											public."message"
										WHERE from_id = ${myId}
									UNION
										SELECT id, from_id user_id, timestamp FROM
											public."message"
										WHERE
											to_id = ${myId}
								) t1
								GROUP BY user_id
							) t2
						ON
							( from_id = ${myId} AND to_id = user_id OR from_id = user_id AND to_id = ${myId} )  AND timestamp = m
						ORDER BY
							timestamp DESC
				`);
	}

	async remove(userId: number) {
		// TODO: get myId from jwt token
		const myId:number = 1;

		return this.messageRepository.createQueryBuilder('message').delete()
			.where(new Brackets(qb => {
				qb.where('from_id = :id', {
					id: userId,
				});
				qb.andWhere('to_id = :id2', {
					id2: myId,
				});                               
			}))
			.orWhere(new Brackets(qb => {
				qb.where('to_id = :id3', {
					id3: userId,
				});
				qb.andWhere('from_id = :id4', {
					id4: myId,
				});                               
			}))
			.execute();
	}


}
