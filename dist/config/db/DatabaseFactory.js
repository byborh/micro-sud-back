"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseFactory = void 0;
const MySQLDatabase_1 = require("./drivers/MySQLDatabase");
const RedisDatabase_1 = require("./drivers/RedisDatabase");
class DatabaseFactory {
    static createDatabase(type, config) {
        switch (type) {
            case "mysql":
                return new MySQLDatabase_1.MySQLDatabase();
            case "redis":
                return new RedisDatabase_1.RedisDatabase(config);
            default:
                throw new Error("Invalid database type");
        }
    }
}
exports.DatabaseFactory = DatabaseFactory;
