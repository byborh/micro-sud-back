import { User } from "@modules/users/entity/User.entity";
import { IUserRepository } from "../contract/IUserRepository";
import { Repository } from "typeorm";
import { AppDataSource } from "@db/drivers/AppDataSource";

export class UserRepositoryMySQL implements IUserRepository {
    private repository: Repository<User>;

    constructor() {this.repository = AppDataSource.getRepository(User);}

    async findUserByField(field: string, value: string): Promise<User | null> {
        // Validate field
        const allowedFields = ['id', 'email', 'firstname', 'lastname', 'pseudo', 'telnumber', 'createdAt', 'updatedAt'];
        if(!allowedFields.includes(field)) throw new Error(`Invalid field: ${field}`);

        // List of users finded by field
        const row = await this.repository.findOne({where: {[field]: value}});

        // Validate rows
        if (!row) {
            console.log("No user found for field:", field, "with value:", value);
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
        return user || null;
    }
    
    async findUserById(userId: string): Promise<User | null> {
        if(!userId) return null;
        return await this.findUserByField('id', userId) || null;
    }

    async findUserByEmail(email: string): Promise<User | null> {
        if(!email) return null;
        return await this.findUserByField('email', email) || null;
    }

    async getAllUsers(): Promise<User[]> {
        // Fetch all users from the database
        const rawResult: User[] = await this.repository.find();
    
        // Verify if rawResult is an array or a single object
        const rowsArray = Array.isArray(rawResult) ? rawResult : [rawResult];
    
        if (rowsArray.length === 0) {
            console.log("No users found in the database.");
            return [];
        }
    
        // Return the array of users
        return rowsArray;
    }  

    async createUser(user: User): Promise<User | null> {
        // Insert the user in the database
        const result = await this.repository.save(user);

        // If the user is not created, return null
        if (!result) return null;
    
        // Return the user
        return this.findUserById(user.getId()) || null;
    }

    async modifyUser(user: User): Promise<User | null> {
        // Be sur that user exists
        const existingUser: User = await this.repository.findOne({ where: { id: user.getId() } })
        if(!existingUser) return null;

        // Merge user data with existing user data
        this.repository.merge(existingUser, user);

        // Save the modified user
        const result = await this.repository.save(existingUser);
        
        // Return the user
        return this.findUserById(user.getId()) || null;
    }
    
    async deleteUser(userId: string): Promise<boolean> {
        const result = await this.repository.delete(userId);
        
        // Return true if the user is deleted, false otherwise
        return !result ? false : true;
    }
   
}