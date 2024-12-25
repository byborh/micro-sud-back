import { User } from "../domain/User";
import { UserRepository } from "../repositories/drivers/UserRepository";
import { USerRepositoryMyQSL } from "../repositories/drivers/UserRepositoryMySQL";
import { UserMapper } from "../mapper/UserMapper";
import { UserDTO } from "../dto/UserDTO";
import { IdGenerator } from "src/cores/idGenerator";

export class UserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
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
    // A CREER : 
    /*
        étant donné que l'id n'existe pas, on doit la générer tous seul.
        pas besoin de vérifier si l'id existe (OPTIONEL)

        est ce qu'on va faire lier un utilisateur à son mail et c'est le mail qui deviendra un genre d'id ?

        Il faut changer le type d'id
    */
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
            console.log(`Generated ID: ${userId}`);
    
            // Verify if this id exist
            existingUser = await this.getUserById(userId);
    
        } while (existingUser !== null);
    
        // Assign id to user
        user.setId(userId);

        // Create user from repository
        const createdUser: User | null = await this.userRepository.createUser(user);

        // User didn't created
        if(!createdUser) return null;

        return UserMapper.toDTO(createdUser);
    }
    
   

    // Modify user
    public async modifyUser(user: User): Promise<UserDTO | null> {
        // Verify if this user exist
        const existingUser: UserDTO | null = await this.getUserById(user.getId());
        if(!existingUser) {return null;}

        
        const modifiedUser = new User(
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


        // Compare n Verify if user was changed something
        let hasChanges: boolean = false;
        if(modifiedUser.getEmail() !== user.getEmail()) {
            modifiedUser.setEmail(user.getEmail());
            hasChanges = true;
        }
        if(modifiedUser.getPassword() !== user.getPassword()) {
            modifiedUser.setPassword(user.getPassword());
            hasChanges = true;
        }
        if(modifiedUser.getFirstname() !== user.getFirstname()) {
            modifiedUser.setFirstname(user.getFirstname() ?? '');
            hasChanges = true;
        }
        if(modifiedUser.getLastname() !== user.getLastname()) {
            modifiedUser.setLastname(user.getLastname() ?? '');
            hasChanges = true;
        }
        if(modifiedUser.getPseudo() !== user.getPseudo()) {
            modifiedUser.setPseudo(user.getPseudo() ?? '');
            hasChanges = true;
        }
        if(modifiedUser.getTelnumber() !== user.getTelnumber()) {
            modifiedUser.setTelnumber(user.getTelnumber() ?? '');
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