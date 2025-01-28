"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQLDatabase = void 0;
const promise_1 = require("mysql2/promise");
const config_1 = require("@db/config");
// MySQL Database Config
class MySQLDatabase {
    constructor() {
        this.pool = (0, promise_1.createPool)({
            host: config_1.dbConfig.mysql.host,
            port: config_1.dbConfig.mysql.port,
            user: config_1.dbConfig.mysql.user,
            password: config_1.dbConfig.mysql.password,
            database: config_1.dbConfig.mysql.database,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
            rowsAsArray: false
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Connected to MySQL database');
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Disconnected from MySQL database');
        });
    }
    // Que fait cette méthode ?
    query(queryString, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield this.pool.execute(queryString, params);
            return rows;
        });
    }
}
exports.MySQLDatabase = MySQLDatabase;
