"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    arrayRemove(joinedRooms, roomId) {
        return joinedRooms.filter(function (ele) {
            return ele != roomId;
        });
    }
    create(createUserDto) {
        const newUser = this.usersRepository.create(createUserDto);
        return this.usersRepository.save(newUser);
    }
    findAll() {
        return this.usersRepository.find();
    }
    async findOne(id) {
        const data = await this.usersRepository.findOne(id);
        if (!data)
            throw new common_1.HttpException({ message: 'User Not Found' }, common_1.HttpStatus.NOT_FOUND);
        return data;
    }
    async update(id, updateUserDto, file) {
        const user = await this.findOne(id);
        user.username = updateUserDto.username;
        if (file)
            user.avatar = file.filename;
        return this.usersRepository.save(user);
    }
    async winGame(id) {
        const user = await this.findOne(id);
        user.win = user.win + 1;
        return this.usersRepository.save(user);
    }
    async lostGame(id) {
        const user = await this.findOne(id);
        user.lost = user.lost + 1;
        return this.usersRepository.save(user);
    }
    async joinRoom(id, roomId) {
        const userData = await this.findOne(id);
        if (userData && !userData.joinedRooms.includes(roomId)) {
            userData.joinedRooms.push(roomId);
            this.usersRepository.save(userData);
            return true;
        }
        else
            return false;
    }
    async leaveRoom(id, roomId) {
        const userData = await this.findOne(id);
        if (userData && userData.joinedRooms.includes(roomId)) {
            userData.joinedRooms = this.arrayRemove(userData.joinedRooms, roomId);
            return true;
        }
        return false;
    }
    async remove(id) {
        const user = await this.findOne(id);
        if (user)
            return this.usersRepository.remove(user);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map