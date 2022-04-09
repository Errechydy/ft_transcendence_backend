import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

	arrayRemove(joinedRooms: number[], roomId: number) { 
        return joinedRooms.filter(function(ele){ 
            return ele != roomId; 
        });
    }

	create(createUserDto: CreateUserDto): Promise<User> {
		const newUser = this.usersRepository.create(createUserDto);
		return this.usersRepository.save(newUser);
	}

	findAll() {
		return this.usersRepository.find();
	}

	async findOne(id: number) {
		const data = await  this.usersRepository.findOne(id);
		if (!data)
			throw new HttpException({ message: 'User Not Found' }, HttpStatus.NOT_FOUND);
		return data;
	}

	async update(id: number, updateUserDto: UpdateUserDto, file: Express.Multer.File): Promise<User> {
		const user = await this.findOne(id);

		user.username = updateUserDto.username;
		if(file)
			user.avatar = file.filename;
		
		return this.usersRepository.save(user);
	}

	async winGame(id: number): Promise<User> {
		const user = await this.findOne(id);

		user.win = user.win + 1;
		
		return this.usersRepository.save(user);
	}

	async lostGame(id: number): Promise<User> {
		const user = await this.findOne(id);

		user.lost = user.lost + 1;
		
		return this.usersRepository.save(user);
	}

	async joinRoom(id: number, roomId: number): Promise<boolean> {
		const userData = await this.findOne(id);
		if( userData && !userData.joinedRooms.includes(roomId))
		{
			userData.joinedRooms.push(roomId);
			// TODO: make new JWT that has joinedRooms = userData.joinedRooms 
			this.usersRepository.save(userData);
			return true;
		}
		else
			return false
	}

	async leaveRoom(id: number, roomId: number): Promise<boolean> {
		const userData = await this.findOne(id);
		if( userData && userData.joinedRooms.includes(roomId) )
		{
			userData.joinedRooms = this.arrayRemove(userData.joinedRooms, roomId);
			// TODO: make new JWT that has joinedRooms = userData.joinedRooms 
			return true;
		}
		
		return false;
	}



	async remove(id: number): Promise<User> {
		const user = await this.findOne(id);
		if(user)
			return this.usersRepository.remove(user);
	}


}
