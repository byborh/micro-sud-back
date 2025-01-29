import {User} from "../domain/User";
import {UserRepositoryMySQL} from "../repositories/drivers/UserRepositoryMySQL";
import {DatabaseFactory} from "@db/DatabaseFactory";
import {PasswordManager} from "@core/cryptography/PasswordManager";
import _ from "lodash";

export class UserService {
    private userRepository: UserRepositoryMySQL;

    constructor(userRepository: UserRepositoryMySQL) {
        this.userRepository = userRepository;
    }

    // Get a user by ID
    public async getUserById(userId: string): Promise<User | null> {
        try {
            // Verify if userId is provided
            if (!userId) {
                throw new Error("User ID is required.");
            }

            // Call UserRepository to find a user by ID
            const user: User = await this.userRepository.findUserById(userId);

            // If no user is found, return null
            if (!user) {
                throw new Error("User not found.");
            }

            // ONLY FOR TEST / FOR ADMIN
            // Return the user
            return user;
        } catch (error) {
            console.error("Error finding user in UserService:", error);
            throw new Error("Failed to find user.");
        }
    }

    // Get a user by Email
    public async getUserByEmail(email: string): Promise<User | null> {
        try {
            // Verify if email is provided
            if (!email) {
                throw new Error("Email is required.");
            }

            // Call UserRepository to find a user by email
            const user: User = await this.userRepository.findUserByEmail(email);

            // If no user is found, return null
            if (!user) {
                throw new Error("User not found.");
            }

            // ONLY FOR TEST / FOR ADMIN
            // Return the user
            return user;
        } catch (error) {
            console.error("Error finding user by email in UserService:", error);
            throw new Error("Failed to find user by email.");
        }
    }

    // Get all users
    public async getUsers(): Promise<Array<User> | null> {
        try {
            // Call UserRepository to find all users
            const users: User[] = await this.userRepository.getAllUsers();

            // If no users are found, return null
            if (!users) return null;

            // Return all users
            return users;
        } catch (error) {
            console.error("Error finding users in UserService:", error);
            throw new Error("Failed to find users.");
        }
    }
    
    // Create user
    public async createUser(user: User): Promise<User | null> {
        try {
            const localUser: User | null = await this.getUserByEmail(user.getEmail());
            if (localUser) {
                console.error("User already exists:", localUser);
                throw new Error("User already exists.");
            }

            // Password management
            const passwordManager = PasswordManager.getInstance();

            // Creation of the salt
            const salt: string = passwordManager.generateSalt();

            // Creation of hashed password
            const hashedPassword: string = passwordManager.hashPassword(user.getPassword(), salt);

            console.log('Hash:', hashedPassword);
            console.log('Salt:', salt);

            // Verification
            const isValid: boolean = passwordManager.verifyPassword(user.getPassword(), salt, hashedPassword);
            console.log('Mot de passe valide:', isValid);

            // Assign hashed password to user
            user.setPassword(hashedPassword);
            user.setSalt(salt);

            // HOW ID IS GENERATED ??

            // Create user from repository
            const createdUser: User | null = await this.userRepository.createUser(user);

            // User didn't created
            if (!createdUser) {
                throw new Error("User didn't created...")
            }

            return createdUser;
        } catch (error) {
            console.error("Error creating user in UserService:", error);
            throw new Error("Failed to create user.");
        }
    }

    // Modify user
    public async modifyUser(user: User): Promise<User | null> {
        try {
            console.log("User to modify in service before all functions:", user);

            // Verify if this user exists
            const existingUser: User | null = await this.getUserById(user.getId());
            if (!existingUser) {
                console.error("User not found:", existingUser);
                throw new Error("User not found.");
            }

            console.log("Existing user:", existingUser);

            // Verify if email and password are not null
            if (user.getEmail() === null && user.getPassword() === null) {
                console.error("Email or password can't be null:", user);
                throw new Error("Email or password can't be null.");
            }

            // Compare and verify if user was changed somewhere
            let hasChanges: boolean = false;
            if (user.getEmail() !== existingUser.getEmail()) hasChanges = true;
            if (user.getFirstname() !== existingUser.getFirstname()) hasChanges = true;
            if (user.getLastname() !== existingUser.getLastname()) hasChanges = true;
            if (user.getPseudo() !== existingUser.getPseudo()) hasChanges = true;
            if (user.getTelnumber() !== existingUser.getTelnumber()) hasChanges = true;

            // Verify if password was changed
            const passwordManager = PasswordManager.getInstance();
            const isPasswordValid: boolean = passwordManager.verifyPassword(user.getPassword(), existingUser.getSalt(), existingUser.getPassword());
            console.log('Mot de passe valide:', isPasswordValid);

            if (!isPasswordValid) hasChanges = true;

            if (!hasChanges) {
                console.error("User is not different. The same user like before:", user);
                throw new Error("User is not different. The same user like before.");
            }

            // If password was changed, generate new salt and hash
            if (user.getPassword() !== existingUser.getPassword()) {
                const salt: string = passwordManager.generateSalt();
                const hashedPassword: string = passwordManager.hashPassword(user.getPassword(), salt);

                user.setSalt(salt);
                user.setPassword(hashedPassword);

                console.log('New Hash:', hashedPassword);
                console.log('New Salt:', salt);
            }

            console.log("User to modify in service after all functions:", user);

            // Modify existing user
            const finalUser: User | null = await this.userRepository.modifyUser(user);

            // User didn't modify
            if (!finalUser) return null;

            return finalUser;
        } catch (error) {
            console.error("Error modifying user in UserService:", error);
            throw new Error("Failed to modify user.");
        }
    }
    

    public async modifyUser2(user: User): Promise<User | null> {
        try {
            console.log("User to modify in service before processing:", user);

            // Verify if user exist
            const existingUser: User | null = await this.getUserById(user.getId());
            if (!existingUser) {
                throw new Error("User not found.");
            }

            // Is different ?
            const newUserData = {
                email: user.getEmail(),
                firstname: user.getFirstname(),
                lastname: user.getLastname(),
                pseudo: user.getPseudo(),
                telnumber: user.getTelnumber()
            };

            const existingUserData = {
                email: existingUser.getEmail(),
                firstname: existingUser.getFirstname(),
                lastname: existingUser.getLastname(),
                pseudo: existingUser.getPseudo(),
                telnumber: existingUser.getTelnumber()
            };

            let hasChanges = !_.isEqual(newUserData, existingUserData);

            // if changer, Verify if password changed
            const passwordManager = PasswordManager.getInstance();
            const isPasswordValid: boolean = passwordManager.verifyPassword(
                user.getPassword(), 
                existingUser.getSalt(), 
                existingUser.getPassword()
            );

            if (!isPasswordValid) {
                hasChanges = true;
                // Génération d'un nouveau hash uniquement si le mot de passe change
                const newSalt = passwordManager.generateSalt();
                const hashedPassword = passwordManager.hashPassword(user.getPassword(), newSalt);
                user.setSalt(newSalt);
                user.setPassword(hashedPassword);
            }

            // Si aucun changement, on ne fait rien
            if (!hasChanges) {
                throw new Error("No changes detected.");
            }

            console.log("User to modify in service after processing:", user);

            // Mise à jour dans la base de données
            const updatedUser: User | null = await this.userRepository.modifyUser(user);

            if (!updatedUser) return null;

            // Retourne un DTO sans les données sensibles
            // return {
            //     id: updatedUser.getId(),
            //     email: updatedUser.getEmail(),
            //     firstname: updatedUser.getFirstname(),
            //     lastname: updatedUser.getLastname(),
            //     pseudo: updatedUser.getPseudo(),
            //     telnumber: updatedUser.getTelnumber()
            // };
            return updatedUser;
        } catch (error) {
            console.error("Error modifying user in UserService:", error);
            throw new Error("Failed to modify user.");
        }
    }


    // Delete user
    public async deleteUser(userId: string): Promise<boolean> {
        try {
            // Verify if userId is provided
            if (!userId) {
                throw new Error("User ID is required.");
            }

            // Find the user by ID
            const user: User | null = await this.getUserById(userId);
            if (!user) {
                console.error("User not found:", userId);
                return false;
            }

            // Delete the user
            const isDeleted: boolean = await this.userRepository.deleteUser(userId);

            // Return true if the user is deleted, false otherwise
            return isDeleted;
        } catch (error) {
            console.error("Error deleting user in UserService:", error);
            throw new Error("Failed to delete user.");
        }
    }
}