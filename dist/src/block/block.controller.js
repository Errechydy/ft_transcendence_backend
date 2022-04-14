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
exports.BlockController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt.auth.guard");
const block_service_1 = require("./block.service");
const create_block_dto_1 = require("./dto/create-block.dto");
let BlockController = class BlockController {
    constructor(blockService) {
        this.blockService = blockService;
    }
    blockUser(createBlockDto) {
        const sessionId = 1;
        return this.blockService.blockUser(sessionId, createBlockDto);
    }
    blockedList() {
        const sessionId = 1;
        return this.blockService.blockedListUsers(sessionId);
    }
    unBlockUser(createBlockDto) {
        const sessionId = 1;
        return this.blockService.unBlockUser(sessionId, createBlockDto);
    }
    isBlocked(id) {
        const sessionId = 1;
        return this.blockService.isBlocked(sessionId, +id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_block_dto_1.CreateBlockDto]),
    __metadata("design:returntype", void 0)
], BlockController.prototype, "blockUser", null);
__decorate([
    (0, common_1.Get)('users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BlockController.prototype, "blockedList", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_block_dto_1.CreateBlockDto]),
    __metadata("design:returntype", void 0)
], BlockController.prototype, "unBlockUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BlockController.prototype, "isBlocked", null);
BlockController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('block'),
    __metadata("design:paramtypes", [block_service_1.BlockService])
], BlockController);
exports.BlockController = BlockController;
//# sourceMappingURL=block.controller.js.map