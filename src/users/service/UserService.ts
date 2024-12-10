import { User } from "../domain/User";
import { UserRepository } from "../repository/UserRepository";
import { UserMapper } from "../mapper/UserMapper";
import { UserDTO } from "../dto/UserDTO";

export class UserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    // Get a user by ID
    public async getUserById(userId: number): Promise<UserDTO | null> {
        // Find the user by ID from the repository
        const userEntity : User | null = await this.userRepository.findById(userId);

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
        const existingUser: UserDTO | null = await this.getUserById(user.getId());
        
        // If user exist, return null
        if(existingUser) {return null}

        // Create user from repository
        const createdUser: User | null = await this.userRepository.createUser(user);

        // User didn't created
        if(!createdUser) {return null;}

        return UserMapper.toDTO(createdUser);
    }

    // Modify user
    public async modifyUser(user: User): Promise<User | null> {
        // Verify if this user exist
        const existingUser: UserDTO | null = await this.getUserById(user.getId());

        // If user don't exist, return null 
        if(!existingUser) {return null;}

        // si une donnée d'un attribut a changée alors on la remplace pour la nouvelle
        // sinon on laisse l'ancienne avec son ancienne donnée de l'attribut

        // il faut utiliser plein de getteurs setteurs

        // Return user
        return null;
    }

    // Delete user
    public async deleteUser(userId: number): Promise<boolean> {
        const user: UserDTO | null = await this.getUserById(userId); // Find the user by ID
        if(!user) {return false;} // User not found
        // Delete the user
        return this.userRepository.deleteUser(UserMapper.toEntity(user));
    }

    
}