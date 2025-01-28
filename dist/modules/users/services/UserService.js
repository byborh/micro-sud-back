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
exports.UserService = void 0;
const User_1 = require("../domain/User");
const UserRepositoryMySQL_1 = require("../repositories/drivers/UserRepositoryMySQL");
const UserMapper_1 = require("../mapper/UserMapper");
const DatabaseFactory_1 = require("@db/DatabaseFactory");
const PasswordManager_1 = require("@core/cryptography/PasswordManager");
const ETable_1 = require("@core/foundation/contracts/ETable");
const Foundation_1 = require("@core/foundation/domain/Foundation");
class UserService {
    constructor(userRepository) {
        // Creation dynamicly of the database
        const database = DatabaseFactory_1.DatabaseFactory.createDatabase("mysql", null);
        // Creation of the repository injecting the database
        this.userRepository = new UserRepositoryMySQL_1.UserRepositoryMySQL(database);
    }
    // Get a user by ID
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Find the user by ID from the Foundation Service
            const user = yield this.foundationService.getResourceByField("id", ETable_1.ETable.USERS, userId);
            // If the user is not found, return null
            if (!user)
                return null;
            const userDTO = UserMapper_1.UserMapper.toDTO(user.data);
            // ONLY FOR TEST / FOR ADMIN
            userDTO.password = user.data.getPassword();
            userDTO.salt = user.data.getSalt();
            console.log("User found in getUserById Service :", userDTO);
            // Return the user in DTO format
            return userDTO;
        });
    }
    // Get a user by Email
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            // Find the user by email from the Foundation Service
            const user = yield this.foundationService.getResourceByField("email", ETable_1.ETable.USERS, email);
            // If the user is not found, return null
            if (!user)
                return null;
            const userDTO = UserMapper_1.UserMapper.toDTO(user.data);
            // ONLY FOR TEST / FOR ADMIN
            userDTO.password = user.data.getPassword();
            userDTO.salt = user.data.getSalt();
            console.log("User found in getUserByEmail Service :", userDTO);
            // Return the user in DTO format
            return userDTO;
        });
    }
    // Get all users
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.foundationService.getAllResources(ETable_1.ETable.USERS);
            // If users don't found, return null
            if (!users) {
                return null;
            }
            // Return all users in DTO format
            return users.map(user => UserMapper_1.UserMapper.toDTO(user.data));
        });
    }
    // Create user
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            // Password management
            const passwordManager = PasswordManager_1.PasswordManager.getInstance();
            // Creation of the salt
            const salt = passwordManager.generateSalt();
            // Creation of hashed password
            const hashedPassword = passwordManager.hashPassword(user.getPassword(), salt);
            console.log('Hash:', hashedPassword);
            console.log('Salt:', salt);
            // Verification
            const isValid = passwordManager.verifyPassword(user.getPassword(), salt, hashedPassword);
            console.log('Mot de passe valide:', isValid);
            // Assign hashed password to user
            user.setPassword(hashedPassword);
            user.setSalt(salt);
            const cleanedUser = new User_1.User("", // id will be generated automatically in Foundation Service
            user.getEmail(), user.getPassword(), user.getSalt(), user.getFirstname() || null, user.getLastname() || null, user.getPseudo() || null, user.getTelnumber() || null);
            console.log(cleanedUser);
            // Create user from repository
            // const createdUser: User | null = await this.userRepository.createUser(cleanedUser);
            const createdUser = yield this.foundationService.createResource(ETable_1.ETable.USERS, cleanedUser, 16, "email", user.getEmail());
            // User didn't created
            if (!createdUser)
                return null;
            return UserMapper_1.UserMapper.toDTO(createdUser.data);
        });
    }
    // Modify user
    modifyUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("User to modify in service before all functions:", user);
            // Verify if this user exist
            const exUser = yield this.getUserById(user.getId());
            if (!exUser) {
                console.error("User not found:", exUser);
                throw new Error("User not found.");
            }
            console.log("exUser:", exUser);
            const existingUser = UserMapper_1.UserMapper.toEntity(exUser);
            existingUser.setPassword(exUser.password);
            existingUser.setSalt(exUser.salt);
            console.log("existingUser:", existingUser);
            const modifiedUser = new User_1.User(user.getId(), // Can't be changed
            user.getEmail(), user.getPassword(), // Can be null
            user.getFirstname(), // Can be null
            user.getLastname(), // Can be null
            user.getPseudo(), // Can be null
            user.getTelnumber(), // Can be null
            user.getSalt());
            // Verify if email n password are not "null"
            if (modifiedUser.getEmail === null && modifiedUser.getPassword() === null) {
                console.error("Email or password can't be null:", modifiedUser);
                throw new Error("Email or password can't be null.");
            }
            // Compare n Verify if user was changed somewhere
            let hasChanges = false;
            if (modifiedUser.getEmail() !== existingUser.getEmail())
                hasChanges = true;
            if (modifiedUser.getFirstname() !== existingUser.getFirstname())
                hasChanges = true;
            if (modifiedUser.getLastname() !== existingUser.getLastname())
                hasChanges = true;
            if (modifiedUser.getPseudo() !== existingUser.getPseudo())
                hasChanges = true;
            if (modifiedUser.getTelnumber() !== existingUser.getTelnumber())
                hasChanges = true;
            // Verify if password was changed
            // Password management
            const passwordManager = PasswordManager_1.PasswordManager.getInstance();
            console.log("modifiedUser:", modifiedUser);
            // Verification
            const isPasswordValid = passwordManager.verifyPassword(modifiedUser.getPassword(), existingUser.getSalt(), existingUser.getPassword());
            console.log('Mot de passe valide:', isPasswordValid);
            if (!isPasswordValid)
                hasChanges = true;
            if (hasChanges) {
                console.error("User is not different. The same user like before:", modifiedUser);
                throw new Error("User is not different. The same user like before.");
            }
            // Creation of the salt
            const salt = passwordManager.generateSalt();
            // Creation of hashed password
            const hashedPassword = passwordManager.hashPassword(modifiedUser.getPassword(), salt);
            console.log('Hash:', hashedPassword);
            console.log('Salt:', salt);
            modifiedUser.setSalt(salt);
            modifiedUser.setPassword(hashedPassword);
            console.log("User to modify in service after all functions:", modifiedUser);
            // Modify existing user
            const finalUser = yield this.userRepository.modifyUser(modifiedUser);
            // User didn't modified
            if (!finalUser)
                return null;
            return UserMapper_1.UserMapper.toDTO(finalUser);
        });
    }
    modifyUser1(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("User to modify in service:", user);
                // Vérifiez si les champs critiques ne sont pas null
                if (!user.getEmail() || !user.getPassword()) {
                    throw new Error("Email and password cannot be null.");
                }
                // Gestion des mots de passe
                const passwordManager = PasswordManager_1.PasswordManager.getInstance();
                const salt = passwordManager.generateSalt();
                const hashedPassword = passwordManager.hashPassword(user.getPassword(), salt);
                user.setSalt(salt);
                user.setPassword(hashedPassword);
                console.log("User with updated password and salt:", user);
                // Prépare les champs à mettre à jour
                const updatedFields = {
                    email: user.getEmail(),
                    firstname: user.getFirstname(),
                    lastname: user.getLastname(),
                    pseudo: user.getPseudo(),
                    telnumber: user.getTelnumber(),
                    password: user.getPassword(),
                    salt: user.getSalt(),
                };
                // Utilise `modifyUser` pour appliquer les changements
                const modifiedUser = yield this.foundationService.modifyResource(ETable_1.ETable.USERS, new Foundation_1.Foundation(user), // Crée un objet Foundation<User>
                updatedFields);
                if (!modifiedUser)
                    return null;
                return UserMapper_1.UserMapper.toDTO(modifiedUser.data);
            }
            catch (error) {
                console.error("Error modifying user:", error);
                throw error;
            }
        });
    }
    // Delete user
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUserById(userId); // Find the user by ID
            if (!user) {
                return false;
            } // User not found
            // Delete the user
            return this.userRepository.deleteUser(UserMapper_1.UserMapper.toEntity(user));
        });
    }
}
exports.UserService = UserService;
