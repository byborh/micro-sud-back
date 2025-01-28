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
exports.UserController = void 0;
const UserMapper_1 = require("../mapper/UserMapper");
class UserController {
    // Constructor
    constructor(userService) { this.userService = userService; }
    // Get a user by ID
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Verify permissions ...
                // Get the user from the service
                const userDto = yield this.userService.getUserById(req.params.id);
                // If the user is not found, return an error
                if (!userDto) {
                    res.status(404).json({ error: "User not found" });
                    return;
                }
                // Return the user
                res.status(200).json(userDto);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    }
    // Get all users
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Verify permissions ...
            try {
                // Get all users from the service
                const users = yield this.userService.getUsers();
                if (!users) {
                    res.status(404).json({ error: "Users not found" });
                    return;
                }
                // Return the users
                res.status(200).json(users);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    }
    // Create user
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Verify permissions ...
            try {
                // Change the type of user
                const userDTO = req.body;
                const userEntity = UserMapper_1.UserMapper.toEntity(userDTO);
                if (!userEntity.getEmail || !userEntity.getPassword) {
                    res.status(400).json({ error: "Email and password are required." });
                    return;
                }
                // Use the service to create the user
                const user = yield this.userService.createUser(userEntity);
                if (!user) {
                    res.status(404).json({ error: "User didn't created" });
                    return;
                }
                res.status(201).json(user);
                return;
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal server error", cause: error });
            }
        });
    }
    // Modify user
    modifyUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Verify permissions ...
            try {
                // Change the type of user
                const userDTO = req.body;
                const userEntity = UserMapper_1.UserMapper.toEntity(userDTO);
                userEntity.setId(req.params.id);
                if (!userEntity.getEmail || !userEntity.getPassword) {
                    res.status(400).json({ error: "Email and password are required." });
                    return null;
                }
                console.log("User to modify in controller:", userEntity);
                // Use the service to modify the user
                const user = yield this.userService.modifyUser(userEntity);
                if (!user) {
                    res.status(404).json({ error: "User didn't modified" });
                    return null;
                }
                res.status(201).json(user);
                return null;
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    }
    // Delete user
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Verify permissions ...
            try {
                const deletedOrNot = yield this.userService.deleteUser(req.params.id);
                if (!deletedOrNot) {
                    res.status(404).json({ error: "User didn't deleted" });
                    return;
                }
                res.status(201).json(deletedOrNot);
                return;
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    }
}
exports.UserController = UserController;
