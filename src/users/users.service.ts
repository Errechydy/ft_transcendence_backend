import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>,
	) {}

	create(createUserDto: CreateUserDto): Promise<User> {
		const newUser = this.usersRepository.create(createUserDto);
		return this.usersRepository.save(newUser);
	}

	findAll() {
		return this.usersRepository.find();
	}

	findOne(id: number): Promise<User> {
		return this.usersRepository.findOne(id);
	}

	async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
		const user = await this.findOne(id);

		user.firstName = updateUserDto.firstName;
		user.lastName = updateUserDto.lastName;
		
		return this.usersRepository.save(user);
	}

	async remove(id: number): Promise<User> {
		const user = await this.findOne(id);
		if(user)
			return this.usersRepository.remove(user);
	}
}
