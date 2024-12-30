import { User } from "@modules/users/domain/User";
import { IUserRepository } from "../contract/IUserRepository";
import { IDatabase } from "@db/contract/IDatabase";
import { ResultSetHeader } from "mysql2/promise";
import { UserDTO } from "@modules/users/dto/UserDTO";
import { UserMapper } from "@modules/users/mapper/UserMapper";
import { CredentialData } from "@modules/users/domain/CredentialData";


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
            const query: string = `SELECT * FROM users LIMIT 100;`;
            
            // Fetch all users from the database
            const [rows]: [any, any] = await this.db.query(query);
    
            console.log("Raw query result:", rows);
            console.log("Number of users fetched:", rows.length);
            

            // const users = rows && Array.isArray(rows) ? rows : rows.data || [];
    
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

    async createUser(user: User, credentialData: CredentialData): Promise<User | null> {
        try {
            // SQL query
            const query_1: string = `
            -- Insert the user in the users table
            INSERT INTO users (id, email, password, firstname, lastname, pseudo, telnumber)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            
            -- Insert the credential data in the salt table
            INSERT INTO salt (id, userid, salt)
            VALUES (?, ?, ?);`;

            // Insert the user in the database
            const result_1: [ResultSetHeader, any] = await this.db.query(
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
                ]
            );

            console.log("Query result create user:", result_1);


            // SQL query
            const query_2: string = `
            -- Insert the credential data in the salt table
            INSERT INTO salt (id, userid, salt)
            VALUES (?, ?, ?);`;

            // Insert the user in the database
            const result_2: [ResultSetHeader, any] = await this.db.query(
                query_2,
                [
                    // Salt table
                    credentialData.getId(),
                    user.getId(),
                    credentialData.getSalt()
                ]
            );

            console.log("Query result:", result_2);
            
            // If the user is not created, return null
            if (!result_1) return null;
            if (!result_2) return null;
        
            // Return the user
            return this.findUserById(user.getId());
        } catch (error) {
            console.error("Error creating user:", error,);
            throw new Error("Failed to create user");
        }
    }

    async modifyUser(user: User, credentialData?: CredentialData): Promise<User | null> {
        try {
            console.log("User to modify:", user);
            
            // SQL query
            const query: string = `
            -- Update user
            UPDATE users SET email = ?, password = ?, firstname = ?, lastname = ?, pseudo = ?, telnumber = ?
            WHERE id = ?
            
            -- Update salt
            UPDATE salt
            SET salt = ?
            WHERE userid = ?;`;

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
                    user.getId(),

                    // Salt table
                    credentialData?.getSalt() || null,
                    user.getId()
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
    
    async deleteUser(user: User): Promise<boolean> {
        try {
            const query: string = `
            -- Delete user
            DELETE FROM users WHERE id = ?
            
            -- Delete salt
            DELETE FROM salt WHERE userid = ?;`;

            // Delete the user from the database
            const result: [ResultSetHeader, any] = await this.db.query<any>(
                query,
                [
                    user.getId(),
                    user.getId()
                ]
            )
            
            // Return true if the user is deleted, false otherwise
            return !result ? false : true;
        } catch (error) {
            console.error("Error deleting user:", error);
            throw new Error("Failed to delete user.");
        }
    }
}