import { User } from "../domain/User";
import { UserRepository } from "../repositories/drivers/UserRepository";
import { UserRepositoryMySQL } from "../repositories/drivers/UserRepositoryMySQL";
import { UserMapper } from "../mapper/UserMapper";
import { UserDTO } from "../dto/UserDTO";
import { IdGenerator } from "src/cores/idGenerator";
import { DatabaseFactory } from "@db/DatabaseFactory";

export class UserService {
    private userRepository: UserRepositoryMySQL;

    constructor(userRepository: UserRepositoryMySQL) {
        // Creation dynamicly of the database
        const database = DatabaseFactory.createDatabase("mysql", null);

        // Creation of the repository injecting the database
        this.userRepository = new UserRepositoryMySQL(database);
    }

    // Get a user by ID
    public async getUserById(userId: string): Promise<UserDTO | null> {
        // Find the user by ID from the repository
        const userEntity: User | null = await this.userRepository.findUserById(userId);

        // If the user is not found, return null
        if(!userEntity) {return null;} 

        // Return the user in DTO format
        return UserMapper.toDTO(userEntity);
    }

    // Get a user by Email
    public async getUserByEmail(email: string): Promise<UserDTO | null> {
        // Find the user by Email from the repository
        const userEntity: User | null = await this.userRepository.findUserByEmail(email);

        // If the user is not found, return null
        if(!userEntity) {return null;} 

        // Return the user in DTO format
        return UserMapper.toDTO(userEntity);
    }

    // Get all users
    public async getUsers(): Promise<Array<UserDTO> | null> {
        // Find all users from the repository
        const usersEntity: Array<User> | null = await this.userRepository.getAllUsers();

        // If users don't found, return null
        if(!usersEntity) {return null;}

        // Return all users in DTO format
        return usersEntity.map(userEntity => UserMapper.toDTO(userEntity));
    }
    
    // Create user
    public async createUser(user: User): Promise<UserDTO | null> {
        // Verify if this user exist
        const userVerif: UserDTO | null = await this.getUserByEmail(user.getEmail());
        if(userVerif) return null;

        // Declare variables
        let existingUser: UserDTO | null = null;
        let userId: string;
    
        // Initialize IdGenerator
        const idGenerator = IdGenerator.getInstance();
    
        // Make sure that ID is unique
        do {
            userId = idGenerator.generateId(16); // Generate a unique ID of 16 characters
    
            // Verify if this id exist
            existingUser = await this.getUserById(userId);
    
        } while (existingUser !== null);
    
        console.log(`Generated ID: ${userId}`);
        
        // Assign id to user
        user.setId(userId);

        const cleanedUser: User = new User(
            user.getId(),
            user.getEmail(),
            user.getPassword(),
            user.getFirstname() || null,
            user.getLastname() || null,
            user.getPseudo() || null,
            user.getTelnumber() || null
        );

        // Create user from repository
        const createdUser: User | null = await this.userRepository.createUser(cleanedUser);
        
        // User didn't created
        if(!createdUser) return null;

        return UserMapper.toDTO(createdUser);
    }

    // Modify user
    public async modifyUser(user: User): Promise<UserDTO | null> {
        // Verify if this user exist
        const exUser: UserDTO | null = await this.getUserById(user.getId());
        if(!exUser) return null;

        const existingUser: User = UserMapper.toEntity(exUser);
        
        const modifiedUser: User = new User(
            user.getId(), // Can't be changed
            user.getEmail(),
            user.getPassword(),
            user.getFirstname(), // Can be null
            user.getLastname(), // Can be null
            user.getPseudo(), // Can be null
            user.getTelnumber() // Can be null
        );


        // Verify if email n password are not "null"
        if(modifiedUser.getEmail === null && modifiedUser.getPassword() === null) return null;


        // Compare n Verify if user was changed somewhere
        let hasChanges: boolean = false;
        if(modifiedUser.getEmail() !== existingUser.getEmail()) {
            modifiedUser.setEmail(existingUser.getEmail());
            hasChanges = true;
        }
        if(modifiedUser.getPassword() !== existingUser.getPassword()) {
            modifiedUser.setPassword(existingUser.getPassword());
            hasChanges = true;
        }
        if(modifiedUser.getFirstname() !== existingUser.getFirstname()) {
            modifiedUser.setFirstname(existingUser.getFirstname() ?? '');
            hasChanges = true;
        }
        if(modifiedUser.getLastname() !== existingUser.getLastname()) {
            modifiedUser.setLastname(existingUser.getLastname() ?? '');
            hasChanges = true;
        }
        if(modifiedUser.getPseudo() !== existingUser.getPseudo()) {
            modifiedUser.setPseudo(existingUser.getPseudo() ?? '');
            hasChanges = true;
        }
        if(modifiedUser.getTelnumber() !== existingUser.getTelnumber()) {
            modifiedUser.setTelnumber(existingUser.getTelnumber() ?? '');
            hasChanges = true;
        }
        if(!hasChanges) return null;

        // Modify existing user
        const finalUser: User | null = await this.userRepository.modifyUser(modifiedUser);

        // User didn't modified
        if(!finalUser) return null;

        return UserMapper.toDTO(finalUser);
    }

    // Delete user
    public async deleteUser(userId: string): Promise<boolean> {
        const user: UserDTO | null = await this.getUserById(userId); // Find the user by ID
        if(!user) {return false;} // User not found
        // Delete the user
        return this.userRepository.deleteUser(UserMapper.toEntity(user));
    }   
}