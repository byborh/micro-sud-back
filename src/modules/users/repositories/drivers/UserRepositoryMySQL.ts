import { User } from "@modules/users/domain/User";
import { IUserRepository } from "../contract/IUserRepository";
import { IDatabase } from "@db/contract/IDatabase";
import { ResultSetHeader } from "mysql2/promise";
import { UserMapper } from "@modules/users/mapper/UserMapper";


export class UserRepositoryMySQL implements IUserRepository {
    private db: IDatabase;

    constructor(db: IDatabase) {
        // Injection of database
        this.db = db;
    }

    async findUserByField(field: string, value: string): Promise<User | null> {
        try {
            // Validate field
            const allawedFields = ['id', 'email', 'firstname', 'lastname', 'pseudo', 'telnumber'];
            if(!allawedFields.includes(field)) throw new Error(`Invalid field: ${field}`);

            // SQL query
            const query: string = `SELECT * FROM users WHERE ${field} = ? LIMIT 1`;
    
            // Find a user by field from the database
            const [rows]: [any[], any] = await this.db.query(query, [value]);

            console.log("Raw query result:", rows);
    
            // Validate rows
            if (!rows || rows.length === 0) {
                console.error("No user found for field:", field, "with value:", value);
                return null;
            };

            const user = Array.isArray(rows) ? rows[0] : rows

            console.log("User found:", user);

            // Verify if all required fields are present
            if (!user.id || !user.email || !user.password) {
                console.error("Invalid user data:", user);
                throw new Error("User data is incomplete.");
            }
    
            // Map the result to a User instance
            return new User(
                user.id,
                user.email,
                user.password,
                user.salt,
                user.firstname || null,
                user.lastname || null,
                user.pseudo || null,
                user.telnumber || null
            );
        } catch (error) {
            console.error("Error finding user by field:", error);
            throw new Error("Failed to find user by field.");
        }
    }
    
    async findUserById(userId: string): Promise<User | null> {
        try {
            if(!userId) return null;
            console.log("User to find by id in repository:", this.findUserByField('id', userId));
            return this.findUserByField('id', userId);
        } catch (error) {
            console.error("Error finding user by id:", error);
            throw new Error("Failed to find user by id.");
        }
    }

    async findUserByEmail(email: string): Promise<User | null> {
        try {
            if(!email) return null;
            return this.findUserByField('email', email);
        } catch (error) {
            console.error("Error finding user by email:", error);
            throw new Error("Failed to find user by email.");
        }
    }

    async getAllUsers(): Promise<User[]> {
        try {
            // SQL query
            const query: string = `SELECT * FROM users;`;
    
            // Fetch all users from the database
            const [rawResult]: [any, any] = await this.db.query(query);
            const rows = Array.isArray(rawResult) ? rawResult : [rawResult];

            console.log("Type of rows:", typeof rows);
            console.log("Is rows an array?", Array.isArray(rows));

    
            console.log("Raw query result:", rows);
            console.log("Number of users fetched:", Array.isArray(rows) ? rows.length : 0);
    

            console.log("Query executed:", query);
            console.log("Raw result type:", typeof rows);
            console.log("Raw result isArray:", Array.isArray(rows));
            console.log("Raw result length:", rows.length);
            console.log("Raw result content:", rows);

            // Vérifier si rows est un tableau ou un objet unique
            const rowsArray = Array.isArray(rows) ? rows : [rows]; // Si c'est un objet unique, on le met dans un tableau
    
            if (rowsArray.length === 0) {
                console.error("No users found in the database.");
                return [];
            }
    
            // Utiliser le UserMapper pour mapper chaque ligne en une entité User
            return rowsArray.map(row => UserMapper.toEntity(row));
        } catch (error) {
            console.error("Error getting users:", error);
            throw new Error("Failed to get users.");
        }
    }    

    async createUser(user: User): Promise<User | null> {
        try {
            // SQL query
            const query_1: string = `
            INSERT INTO users (id, email, password, firstname, lastname, pseudo, telnumber, salt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;

            // Insert the user in the database
            const result: [ResultSetHeader, any] = await this.db.query(
                query_1,
                [
                    // User table
                    user.getId(),
                    user.getEmail(),
                    user.getPassword(),
                    user.getFirstname() || null,
                    user.getLastname() || null,
                    user.getPseudo() || null,
                    user.getTelnumber() || null,
                    user.getSalt()
                ]
            );

            console.log("Query result create user:", result);
            
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
            console.log("User to modify:", user);
            
            // SQL query
            const query: string = `
            -- Update user
            UPDATE users SET email = ?, password = ?, firstname = ?, lastname = ?, pseudo = ?, telnumber = ?, salt = ?
            WHERE id = ?`;

            // Update the user in the database
            const result: [ResultSetHeader, any] = await this.db.query(
                query,
                [
                    // User table
                    user.getEmail(),
                    user.getPassword(),
                    user.getFirstname() || null,
                    user.getLastname() || null,
                    user.getPseudo() || null,
                    user.getTelnumber() || null,
                    user.getSalt(),
                    user.getId(),
                ]
            );

            console.log("Query result from modifyUser:", result);

            if (!result) return null;
            
            return this.findUserById(user.getId());
        } catch (error) {
            console.error("Error modifying user:", error);
            throw new Error("Failed to modify user.");
        }
    }
    
    async deleteUser(userId: string): Promise<boolean> {
        try {
            const query: string = `
            -- Delete user
            DELETE FROM users WHERE id = ?`;

            // Delete the user from the database
            const result: [ResultSetHeader, any] = await this.db.query<any>(query, [userId])
            
            // Return true if the user is deleted, false otherwise
            return !result ? false : true;
        } catch (error) {
            console.error("Error deleting user:", error);
            throw new Error("Failed to delete user.");
        }
    }
}