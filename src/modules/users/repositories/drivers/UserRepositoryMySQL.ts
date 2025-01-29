import { User } from "@modules/users/domain/User";
import { IUserRepository } from "../contract/IUserRepository";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(User)
export class UserRepositoryMySQL extends Repository<User> implements IUserRepository {
    async findUserByField(field: string, value: string): Promise<User | null> {
        try {
            // Validate field
            const allowedFields = ['id', 'email', 'firstname', 'lastname', 'pseudo', 'telnumber', 'createdAt', 'updatedAt'];
            if(!allowedFields.includes(field)) throw new Error(`Invalid field: ${field}`);

            // List of users finded by field
            const row = await this.findOne({where: {[field]: value}});
    
            // Validate rows
            if (!row) {
                console.error("No user found for field:", field, "with value:", value);
                return null;
            };

            const user = Array.isArray(row) ? row[0] : row

            console.log("User found:", user);

            // Verify if all required fields are present
            if (!user.id || !user.email || !user.password) {
                console.error("Invalid user data:", user);
                throw new Error("User data is incomplete.");
            }
    
            // Map the result to a User instance
            return user;
        } catch (error) {
            console.error("Error finding user by field:", error);
            throw new Error("Failed to find user by field.");
        }
    }
    
    async findUserById(userId: string): Promise<User | null> {
        try {
            if(!userId) return null;
            console.log("User to find by id in repository:", this.findUserByField('id', userId));
            return await this.findUserByField('id', userId);
        } catch (error) {
            console.error("Error finding user by id:", error);
            throw new Error("Failed to find user by id.");
        }
    }

    async findUserByEmail(email: string): Promise<User | null> {
        try {
            if(!email) return null;
            return await this.findUserByField('email', email);
        } catch (error) {
            console.error("Error finding user by email:", error);
            throw new Error("Failed to find user by email.");
        }
    }

    async getAllUsers(): Promise<User[]> {
        try {
            // Fetch all users from the database
            const [rawResult]: User[] = await this.find();
            const rows = Array.isArray(rawResult) ? rawResult : [rawResult];

            // Verify if rows are an array or a single object
            const rowsArray = Array.isArray(rows) ? rows : [rows]; // if single object, insert in an array
    
            if (rowsArray.length === 0) {
                console.error("No users found in the database.");
                return [];
            }
    
            // Utiliser le UserMapper pour mapper chaque ligne en une entité User
            return rowsArray.map(row => row);
        } catch (error) {
            console.error("Error getting users:", error);
            throw new Error("Failed to get users.");
        }
    }    

    async createUser(user: User): Promise<User | null> {
        try {
            // Insert the user in the database
            const result: User = this.create(user);

            // If the user is not created, return null
            if (!result) return null;
        
            // Return the user
            return this.findUserById(user.getId());
        } catch (error) {
            console.error("Error creating user:", error,);
            throw new Error("Failed to create user");
        }
    }

    async modifyUser(user: User): Promise<User | null> {
        try {
            const result = await this.insert(user);

            if (!result) return null;
            
            return this.findUserById(user.getId());
        } catch (error) {
            console.error("Error modifying user:", error);
            throw new Error("Failed to modify user.");
        }
    }
    
    async deleteUser(userId: string): Promise<boolean> {
        try {
            const result = await this.delete(userId);
            
            // Return true if the user is deleted, false otherwise
            return !result ? false : true;
        } catch (error) {
            console.error("Error deleting user:", error);
            throw new Error("Failed to delete user.");
        }
    }
   
}