import { IdGenerator } from "@core/idGenerator";
import {User} from "../domain/User";
import { UserDTO } from "../dto/UserDTO";
import { UserMapper } from "../mapper/UserMapper";
import {UserRepositoryMySQL} from "../repositories/drivers/UserRepositoryMySQL";
import {PasswordManager} from "@core/cryptography/PasswordManager";
import _ from "lodash";
import { DataSource } from "typeorm";

export class UserService {
    private userRepository: UserRepositoryMySQL;

    constructor(dataSource: DataSource) {
        this.userRepository = new UserRepositoryMySQL(dataSource);
    }

    // Get a user by ID
    public async getUserById(userId: string): Promise<UserDTO | null> {
        try {
            // Verify if userId is provided
            if (!userId) {
                throw new Error("User ID is required.");
            }

            // Call UserRepository to find a user by ID
            const userEntity: User = await this.userRepository.findUserById(userId);

            // If no user is found, return null
            if (!userEntity) {
                throw new Error("User not found.");
            }

            // Transform the entity to the dto
            const userDTO: UserDTO = UserMapper.toDTO(userEntity);

            // Return the user
            return userDTO;
        } catch (error) {
            console.error("Error finding user in UserService:", error);
            throw new Error("Failed to find user.");
        }
    }

    // Get a user by Email
    public async getUserByEmail(email: string): Promise<UserDTO | null> {
        try {
            // Verify if email is provided
            if (!email) {
                throw new Error("Email is required.");
            }

            // Call UserRepository to find a user by email
            const userEntity: User = await this.userRepository.findUserByEmail(email);

            // If no user is found, return null
            if (!userEntity) {
                throw new Error("User not found.");
            }

            // Transform the entity to the dto
            const userDTO: UserDTO = UserMapper.toDTO(userEntity);

            // Return the user
            return userDTO;
        } catch (error) {
            console.error("Error finding user by email in UserService:", error);
            throw new Error("Failed to find user by email.");
        }
    }

    // Get all users
    public async getUsers(): Promise<Array<UserDTO> | null> {
        try {
            // Call UserRepository to find all users
            const usersEntity: User[] = await this.userRepository.getAllUsers();

            // If no users are found, return null
            if (!usersEntity) return null;

            // Return all users in DTO format
            return usersEntity.map(userEntity => UserMapper.toDTO(userEntity));
        } catch (error) {
            console.error("Error finding users in UserService:", error);
            throw new Error("Failed to find users.");
        }
    }
    
    // Create user
    public async createUser(user: User): Promise<UserDTO | null> {
        try {
            // Verify if user exists
            const localUser: UserDTO | null = await this.getUserByEmail(user.getEmail());
            if (localUser) {
                console.error("User already exists:", localUser);
                throw new Error("User already exists.");
            }
            

            // Initialize IdGenerator
            const idGenerator = IdGenerator.getInstance();
            let userId: string;
            let existingUser: UserDTO | null = null;
        
            // Make sure that ID is unique
            do {
                userId = idGenerator.generateId(16); // Generate a unique ID of 16 characters
        
                // Verify if this id exist
                existingUser = await this.getUserById(userId);
        
            } while (existingUser !== null);
        
            console.log(`Generated ID: ${userId}`);

            // Assign ID to user
            user.setId(userId);

            // Password management
            const passwordManager = PasswordManager.getInstance();

            // Creation of the salt
            const salt: string = passwordManager.generateSalt();

            // Creation of hashed password
            const hashedPassword: string = passwordManager.hashPassword(user.getPassword(), salt);

            // A SUPPRIMER AVANT LA PROD !!!
            console.log('Password:', user.getPassword());
            console.log('Hash:', hashedPassword);
            console.log('Salt:', salt);

            // Verification of password
            const isValid: boolean = passwordManager.verifyPassword(user.getPassword(), salt, hashedPassword);
            console.log('Mot de passe valide:', isValid);

            // Assign hashed password to user
            user.setPassword(hashedPassword);
            user.setSalt(salt);

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
    public async modifyUser(user: User): Promise<UserDTO | null> {
        try {
            console.log("User to modify in service before processing:", user);

            // Vérifier si l'utilisateur existe
            const existingUserDTO: UserDTO | null = await this.getUserById(user.getId());
            if (!existingUserDTO) {
                throw new Error("User not found.");
            }

            // Convertir le DTO en entité User
            const existingUser = UserMapper.toEntity(existingUserDTO);

            // Comparer les données hors mot de passe
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

            // Vérifier si le mot de passe a changé
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

            // Retourner un DTO sans les données sensibles
            return UserMapper.toDTO(updatedUser);
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
            const user: UserDTO | null = await this.getUserById(userId);
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