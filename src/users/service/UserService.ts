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
        // Find the user by ID in the repository
        const userEntity : User | null = await this.userRepository.findById(userId);

        // If the user is not found, return null
        if(!userEntity) {return null;} 

        // Return the user in DTO format
        return UserMapper.toDTO(userEntity);
    }
}