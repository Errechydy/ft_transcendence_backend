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
exports.BanController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt.auth.guard");
const room_service_1 = require("../room/room.service");
const ban_service_1 = require("./ban.service");
const create_ban_dto_1 = require("./dto/create-ban.dto");
const update_ban_dto_1 = require("./dto/update-ban.dto");
let BanController = class BanController {
    constructor(banService, roomService) {
        this.banService = banService;
        this.roomService = roomService;
    }
    async create(createBanDto) {
        const sessionId = 1;
        const roomData = await this.roomService.findOne(createBanDto.room_id);
        return this.banService.create(sessionId, roomData, createBanDto);
    }
    findAll() {
        return this.banService.findAll();
    }
    async update(updateBanDto) {
        const sessionId = 1;
        const roomData = await this.roomService.findOne(updateBanDto.room_id);
        return this.banService.update(sessionId, roomData, updateBanDto);
    }
    roomBannedList(roomId) {
        return this.banService.roomBannedList(+roomId);
    }
    findUserInRoom(roomId, userId) {
        return this.banService.findUserInRoom(+roomId, +userId);
    }
    async unbanUserFromRoom(roomId, userId) {
        const sessionId = 1;
        const roomData = await this.roomService.findOne(+roomId);
        return this.banService.unbanUserFromRoom(sessionId, roomData, +roomId, +userId);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ban_dto_1.CreateBanDto]),
    __metadata("design:returntype", Promise)
], BanController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BanController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_ban_dto_1.UpdateBanDto]),
    __metadata("design:returntype", Promise)
], BanController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('room/:roomId/banned'),
    __param(0, (0, common_1.Param)('roomId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BanController.prototype, "roomBannedList", null);
__decorate([
    (0, common_1.Get)('room/:roomId/user/:userId'),
    __param(0, (0, common_1.Param)('roomId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], BanController.prototype, "findUserInRoom", null);
__decorate([
    (0, common_1.Delete)('room/:roomId/user/:userId'),
    __param(0, (0, common_1.Param)('roomId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BanController.prototype, "unbanUserFromRoom", null);
BanController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('ban'),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => room_service_1.RoomService))),
    __metadata("design:paramtypes", [ban_service_1.BanService,
        room_service_1.RoomService])
], BanController);
exports.BanController = BanController;
//# sourceMappingURL=ban.controller.js.map