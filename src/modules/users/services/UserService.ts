import { User } from "../domain/User";
import { UserRepositoryMySQL } from "../repositories/drivers/UserRepositoryMySQL";
import { UserMapper } from "../mapper/UserMapper";
import { UserDTO } from "../dto/UserDTO";
import { IdGenerator } from "@core/cryptography/idGenerator";
import { DatabaseFactory } from "@db/DatabaseFactory";
import { PasswordManager } from "@core/cryptography/PasswordManager";

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
        const userEntity: User | null = await this.userRepository.findUserByField("id", userId);

        // If the user is not found, return null
        if(!userEntity) return null;

        const userDTO: UserDTO = UserMapper.toDTO(userEntity as User) as User;

        // ONLY FOR TEST / FOR ADMIN
        userDTO.password = userEntity.getPassword();
        userDTO.salt = userEntity.getSalt();

        console.log("User found in getUserById Service :", userDTO);

        // Return the user in DTO format
        return userDTO;
    }

    // Get a user by Email
    public async getUserByEmail(email: string): Promise<UserDTO | null> {
        // Find the user by Email from the repository
        const userEntity: User | null = await this.userRepository.findUserByField("email", email);

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

        

        const cleanedUser: User = new User(
            user.getId(),
            user.getEmail(),
            user.getPassword(),
            user.getSalt(),
            user.getFirstname() || null,
            user.getLastname() || null,
            user.getPseudo() || null,
            user.getTelnumber() || null,
        );

        console.log(cleanedUser);

        // Create user from repository
        const createdUser: User | null = await this.userRepository.createUser(cleanedUser);
        
        // User didn't created
        if(!createdUser) return null;

        return UserMapper.toDTO(createdUser);
    }

    // Modify user
    public async modifyUser(user: User): Promise<UserDTO | null> {
        console.log("User to modify in service before all functions:", user);

        if (!user.getId()) {
            console.error("Invalid user ID provided for modification:", user);
            throw new Error("User ID is required.");
        }

        // Verify if this user exist        
        const exUser: UserDTO | null = await this.getUserById(user.getId()) as User;
        if(!exUser) {
            console.error("User not found:", exUser);
            throw new Error("User not found.");
        }

        console.log("exUser:", exUser);

        const existingUser: User = UserMapper.toEntity(exUser);
        existingUser.setPassword(exUser.password);
        existingUser.setSalt(exUser.salt);

        console.log("existingUser:", existingUser);

        const modifiedUser: User = new User(
            user.getId(), // Can't be changed
            user.getEmail(),
            user.getPassword(), // Can be null
            user.getFirstname(), // Can be null
            user.getLastname(), // Can be null
            user.getPseudo(), // Can be null
            user.getTelnumber(), // Can be null
            user.getSalt()
        );


        // Verify if email n password are not "null"
        if(modifiedUser.getEmail === null && modifiedUser.getPassword() === null) {
            console.error("Email or password can't be null:", modifiedUser);
            throw new Error("Email or password can't be null.");
        }


        // Compare n Verify if user was changed somewhere
        let hasChanges: boolean = false;
        if(modifiedUser.getEmail() !== existingUser.getEmail()) hasChanges = true;
        if(modifiedUser.getFirstname() !== existingUser.getFirstname())  hasChanges = true;
        if(modifiedUser.getLastname() !== existingUser.getLastname())  hasChanges = true;
        if(modifiedUser.getPseudo() !== existingUser.getPseudo())  hasChanges = true;
        if(modifiedUser.getTelnumber() !== existingUser.getTelnumber()) hasChanges = true;

        // Verify if password was changed

        // Password management
        const passwordManager = PasswordManager.getInstance();

        console.log("modifiedUser:", modifiedUser)

        // Verification
        const isPasswordValid: boolean = passwordManager.verifyPassword(modifiedUser.getPassword(), existingUser.getSalt(), existingUser.getPassword());
        console.log('Mot de passe valide:', isPasswordValid);

        if(!isPasswordValid) hasChanges = true;
        

        if(hasChanges)  {
            console.error("User is not different. The same user like before:", modifiedUser);
            throw new Error("User is not different. The same user like before.");
        }

        // Creation of the salt
        const salt: string = passwordManager.generateSalt();

        // Creation of hashed password
        const hashedPassword: string = passwordManager.hashPassword(modifiedUser.getPassword(), salt);

        console.log('Hash:', hashedPassword);
        console.log('Salt:', salt);

        modifiedUser.setSalt(salt);
        modifiedUser.setPassword(hashedPassword);


        console.log("User to modify in service after all functions:", modifiedUser);

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