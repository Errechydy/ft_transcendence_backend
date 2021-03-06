/// <reference types="multer" />
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { BlockService } from 'src/block/block.service';
import { HttpService } from '@nestjs/axios';
export declare class UsersController {
    private readonly usersService;
    private readonly blockService;
    private authService;
    private httpService;
    constructor(usersService: UsersService, blockService: BlockService, authService: AuthService, httpService: HttpService);
    createNewUser(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    create(code: string): Promise<{
        registred: boolean;
        user: any;
        token: string;
    }>;
    findAll(): Promise<import("./entities/user.entity").User[]>;
    findOne(id: string): Promise<import("./entities/user.entity").User>;
    update(id: string, updateUserDto: UpdateUserDto, file: Express.Multer.File): Promise<import("./entities/user.entity").User>;
    remove(id: string): Promise<import("./entities/user.entity").User>;
    getCurrentLoggedinUser(req: any): Promise<import("./entities/user.entity").User>;
}
