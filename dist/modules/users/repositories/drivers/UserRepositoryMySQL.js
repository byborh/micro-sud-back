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
exports.UserRepositoryMySQL = void 0;
const Foundation_1 = require("@core/foundation/domain/Foundation");
class UserRepositoryMySQL {
    constructor(db) {
        // Injection of database
        this.db = db;
    }
    findUserByField(field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Call FoundationRepositoryMySQL to find a user by field
                const user = yield this.foundationRepository.findResourceByField('users', field, value);
                // If no user is found, return null
                if (!user)
                    return null;
                // Return the user
                return user.data;
            }
            catch (error) {
                console.error("Error finding user in UserRepository:", error);
                throw new Error("Failed to find user.");
            }
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Call FoundationRepositoryMySQL to find users
                const users = yield this.foundationRepository.findAllResources('users');
                // If no users are found, return null
                if (!users)
                    return null;
                // Return the users
                return users.map(user => user.data);
            }
            catch (error) {
                console.error("Error getting users in UserRepository:", error);
                throw new Error("Failed to get users.");
            }
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Create a resource from the user
                const resource = new Foundation_1.Foundation(user);
                // Call FoundationRepositoryMySQL to create a user
                const createdUser = yield this.foundationRepository.createResource('users', resource);
                // If no user is found, return null
                if (!createdUser)
                    return null;
                // Return the user
                return createdUser.data;
            }
            catch (error) {
                console.error("Error creating user in UserRepository:", error);
                throw new Error("Failed to create user");
            }
        });
    }
    modifyUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Create a resource from the user
                const resource = new Foundation_1.Foundation(user);
                // Call FoundationRepositoryMySQL to create a user
                const createdUser = yield this.foundationRepository.modifyResource('users', resource, user.getId());
                // If no user is found, return null
                if (!createdUser)
                    return null;
                // Return the user
                return createdUser.data;
            }
            catch (error) {
                console.error("Error modifying user in UserRepository:", error);
                throw new Error("Failed to modify user.");
            }
        });
    }
    deleteUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Call FoundationRepositoryMySQL to find a user by field
                const deletedUser = yield this.foundationRepository.deleteResource('users', user.getId());
                // Return true if the user was deleted successfully, false otherwise
                return deletedUser;
            }
            catch (error) {
                console.error("Error deleting user in UserRepository:", error);
                throw new Error("Failed to delete user.");
            }
        });
    }
}
exports.UserRepositoryMySQL = UserRepositoryMySQL;
