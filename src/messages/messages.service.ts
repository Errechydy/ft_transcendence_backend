import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
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
		const newMessage = this.messageRepository.create(createMessageDto);
		return this.messageRepository.save(newMessage);
	}

	findAll() {
		return this.messageRepository.find();
	}

	findOne(id: number) {
		return this.messageRepository.findOne(id);
	}

	async update(id: number, updateMessageDto: UpdateMessageDto) {
		const message = await this.findOne(id);

		message.msg = updateMessageDto.msg;
		
		return this.messageRepository.save(message);
	}

	async remove(id: number) {
		const message = await this.findOne(id);

		return this.messageRepository.remove(message);
	}

	async getChatList(myId: number) {
		return getConnection().query(`
			select * FROM
				public."message"
					INNER JOIN
						public."user"
					ON
						public."message".from_id = public."user".id and public."message".from_id = ${myId}
						or 
						public."message".to_id = public."user".id and public."message".to_id = ${myId}
					INNER JOIN 
						(
							select user_id, max(timestamp) m from
							(
								select id, to_id user_id, timestamp from
										public."message"
									where from_id = ${myId}
								
								union
								
									select id, from_id user_id, timestamp from
										public."message"
									where
										to_id = ${myId}
							) t1
							group by user_id
						) t2
						on
							(
								from_id = ${myId} and to_id = user_id or from_id = user_id and to_id = ${myId}
							) 
							and
								timestamp = m
						order by
							timestamp desc
				`);
	}
}
