/// <reference types="multer" />
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    arrayRemove(joinedRooms: number[], roomId: number): number[];
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto, file: Express.Multer.File): Promise<User>;
    winGame(id: number): Promise<User>;
    lostGame(id: number): Promise<User>;
    joinRoom(id: number, roomId: number): Promise<boolean>;
    leaveRoom(id: number, roomId: number): Promise<boolean>;
    remove(id: number): Promise<User>;
}
