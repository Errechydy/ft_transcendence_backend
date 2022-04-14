"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configService = void 0;
const ban_entity_1 = require("./src/ban/entities/ban.entity");
const block_entity_1 = require("./src/block/entities/block.entity");
const message_entity_1 = require("./src/messages/entities/message.entity");
const room_message_entity_1 = require("./src/room/entities/room-message.entity");
const room_entity_1 = require("./src/room/entities/room.entity");
const user_entity_1 = require("./src/users/entities/user.entity");
require('dotenv').config();
class ConfigService {
    constructor(env) {
        this.env = env;
    }
    getValue(key, throwOnMissing = true) {
        const value = this.env[key];
        if (!value && throwOnMissing) {
            throw new Error(`config error - missing env.${key}`);
        }
        return value;
    }
    ensureValues(keys) {
        keys.forEach(k => this.getValue(k, true));
        return this;
    }
    isProduction() {
        const mode = this.getValue('MODE', false);
        return mode != 'DEV';
    }
    getTypeOrmConfig() {
        return {
            type: 'postgres',
            host: this.getValue('POSTGRES_HOST'),
            port: parseInt(this.getValue('POSTGRES_PORT')),
            username: this.getValue('POSTGRES_USER'),
            password: this.getValue('POSTGRES_PASSWORD'),
            database: this.getValue('POSTGRES_DATABASE'),
            entities: [user_entity_1.User, message_entity_1.Message, ban_entity_1.Ban, room_entity_1.Room, block_entity_1.Block, room_message_entity_1.RoomMessage],
            migrationsTableName: 'migration',
            migrations: ['src/migration/*.ts'],
            cli: {
                migrationsDir: 'src/migration',
            },
            synchronize: !this.isProduction(),
            ssl: this.isProduction(),
        };
    }
}
const configService = new ConfigService(process.env)
    .ensureValues([
    'POSTGRES_HOST',
    'POSTGRES_PORT',
    'POSTGRES_USER',
    'POSTGRES_PASSWORD',
    'POSTGRES_DATABASE'
]);
exports.configService = configService;
//# sourceMappingURL=orm-config.js.map