import { User } from "@modules/users/domain/User";
import { IUserRepository } from "../contract/IUserRepository";
import { IDatabase } from "@db/contract/IDatabase";
import { FoundationRepositoryMySQL } from "@core/foundation/repositories/FoundationRepositoryMySQL";
import { Foundation } from "@core/foundation/domain/Foundation";


export class UserRepositoryMySQL implements IUserRepository {
    private db: IDatabase;
    private foundationRepository: FoundationRepositoryMySQL;

    constructor(db: IDatabase) {
        // Injection of database
        this.db = db;
    }

    async findUserByField(field: string, value: string): Promise<User | null> {
        try {
            // Call FoundationRepositoryMySQL to find a user by field
            const user: Foundation<User> = await this.foundationRepository.findResourceByField<User>('users', field, value);

            // If no user is found, return null
            if(!user) return null;

            // Return the user
            return user.data;
        } catch(error) {
            console.error("Error finding user in UserRepository:", error);
            throw new Error("Failed to find user.");
        }
    }

    async getAllUsers(): Promise<User[]> {
        try {
            // Call FoundationRepositoryMySQL to find users
            const users: Foundation<User>[] = await this.foundationRepository.findAllResources<User>('users');

            // If no users are found, return null
            if(!users) return null;

            // Return the users
            return users.map(user => user.data);
        } catch (error) {
            console.error("Error getting users in UserRepository:", error);
            throw new Error("Failed to get users.");
        }
    }    

    async createUser(user: User): Promise<User | null> {
        try {
            // Create a resource from the user
            const resource: Foundation<User> = new Foundation<User>(user);

            // Call FoundationRepositoryMySQL to create a user
            const createdUser: Foundation<User> = await this.foundationRepository.createResource<User>('users', resource);

            // If no user is found, return null
            if(!createdUser) return null;

            // Return the user
            return createdUser.data;
        } catch (error) {
            console.error("Error creating user in UserRepository:", error,);
            throw new Error("Failed to create user");
        }
    }

    async modifyUser(user: User): Promise<User | null> {
        try {
            // Create a resource from the user
            const resource: Foundation<User> = new Foundation<User>(user);

            // Call FoundationRepositoryMySQL to create a user
            const createdUser: Foundation<User> = await this.foundationRepository.modifyResource<User>('users', resource, user.getId());

            // If no user is found, return null
            if(!createdUser) return null;

            // Return the user
            return createdUser.data;
        } catch (error) {
            console.error("Error modifying user in UserRepository:", error);
            throw new Error("Failed to modify user.");
        }
    }
    
    async deleteUser(user: User): Promise<boolean> {
        try {
            // Call FoundationRepositoryMySQL to find a user by field
            const deletedUser: boolean = await this.foundationRepository.deleteResource<User>('users', user.getId());

            // Return true if the user was deleted successfully, false otherwise
            return deletedUser;
        } catch (error) {
            console.error("Error deleting user in UserRepository:", error);
            throw new Error("Failed to delete user.");
        }
    }
}