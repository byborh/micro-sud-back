"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserModule = void 0;
const UserController_1 = require("./controllers/UserController");
const UserService_1 = require("./services/UserService");
const UserRepositoryMySQL_1 = require("./repositories/drivers/UserRepositoryMySQL");
const userRoutes_1 = require("./route/userRoutes");
const MySQLDatabase_1 = require("@db/drivers/MySQLDatabase");
const createUserModule = () => {
    const mySQLDatabase = new MySQLDatabase_1.MySQLDatabase;
    const userRepositoryMySQL = new UserRepositoryMySQL_1.UserRepositoryMySQL(mySQLDatabase);
    const userService = new UserService_1.UserService(userRepositoryMySQL);
    const userController = new UserController_1.UserController(userService);
    // Le contrôleur sera injecté dans les routes
    return (0, userRoutes_1.userRoutes)(userController);
};
exports.createUserModule = createUserModule;
