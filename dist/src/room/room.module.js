"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomModule = void 0;
const common_1 = require("@nestjs/common");
const room_service_1 = require("./room.service");
const room_controller_1 = require("./room.controller");
const typeorm_1 = require("@nestjs/typeorm");
const room_entity_1 = require("./entities/room.entity");
const room_message_entity_1 = require("./entities/room-message.entity");
const block_module_1 = require("../block/block.module");
const ban_module_1 = require("../ban/ban.module");
const chat_room_gateway_1 = require("./chat-room.gateway");
const users_module_1 = require("../users/users.module");
let RoomModule = class RoomModule {
};
RoomModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([room_entity_1.Room, room_message_entity_1.RoomMessage]), block_module_1.BlockModule, ban_module_1.BanModule, users_module_1.UsersModule],
        controllers: [room_controller_1.RoomController],
        providers: [room_service_1.RoomService, chat_room_gateway_1.ChatRoomGateway],
        exports: [room_service_1.RoomService]
    })
], RoomModule);
exports.RoomModule = RoomModule;
//# sourceMappingURL=room.module.js.map