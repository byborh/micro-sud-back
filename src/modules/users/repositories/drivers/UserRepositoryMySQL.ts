import { User } from "@modules/users/domain/User";
import { IUserRepository } from "../contract/IUserRepository";
import { IDatabase } from "@db/contract/IDatabase";


export class UserRepositoryMySQL implements IUserRepository {
    private db: IDatabase;

    constructor(db: IDatabase) {
        // Injection of database
        this.db = db;
    }

    async findUserByField(field: string, value: string): Promise<User | null> {
        try {
            // SQL query
            const query: string = `SELECT * FROM users WHERE ${field} = ? LIMIT 1`;
    
            // Find a user by field from the database
            const [rows]: [Array<User>] = await this.db.query(query, [value]);
    
            // If the user is not found, return null
            if(!rows.length) return null;
    
            // Return the user
            const user = rows[0];
            return new User(user.id, user.email, user.password, user.firstname, user.lastname, user.pseudo, user.telnumber) || null;
        } catch(error) {
            console.error("Error finding user by field:", error);
            throw new Error("Failed to find user by field.");
        }
    }

    async findUserById(userId: string): Promise<User | null> {
        return this.findUserByField('id', userId);
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return this.findUserByField('email', email);
    }

    async getAllUsers(): Promise<User[] | null> {
        try {
            // SQL query
            const query = "SELECT * FROM users";
    
            // Execute the query and type the rows correctly
            const [rows]: [Array<{
                id: string;
                email: string;
                password: string;
                firstname?: string;
                lastname?: string;
                pseudo?: string;
                telnumber?: string;
            }>] = await this.db.query(query);
    
            // If no users found, return null
            if (!rows.length) return null;
    
            // Map the rows to User entities
            return rows.map(row => new User(
                row.id,
                row.email,
                row.password,
                row.firstname,
                row.lastname,
                row.pseudo,
                row.telnumber
            ));
        } catch (error) {
            console.error("Error fetching all users:", error);
            throw new Error("Failed to fetch all users.");
        }
    }

    async createUser(user: User): Promise<User | null> {
        try {
            // SQL query
            const query: string = "INSERT INTO users (id, email, password, firstname, lastname, pseudo, telnumber) VALUES (?, ?, ?, ?, ?, ?, ?)";

            // Insert the user in the database
            const [result] = await this.db.query<any>(
                query,
                [
                    user.getId(),
                    user.getEmail(),
                    user.getPassword(),
                    user.getFirstname(),
                    user.getLastname(),
                    user.getPseudo(),
                    user.getTelnumber()
                ]
            );
            
            // If the user is not created, return null
            if (result.affectedRows === 0) {
                return null;
            }
        
            // Return the user
            return this.findUserById(user.getId());
        } catch (error) {
            console.error("Error fetching creating user:", error);
            throw new Error("Failed to fetch create user");
        }
    }

    async modifyUser(user: User): Promise<User | null> {
        try {
            // SQL query
            const query: string = "UPDATE users SET email = ?, password = ?, firstname = ?, lastname = ?, pseudo = ?, telnumber = ? WHERE id = ?";

            // Update the user in the database
            const [result] = await this.db.query<any>(
                query,
                [
                    user.getId(),
                    user.getEmail(),
                    user.getPassword(),
                    user.getFirstname(),
                    user.getLastname(),
                    user.getPseudo(),
                    user.getTelnumber()
                ]
            );

            if (result.affectedRows === 0) {
                return null;
            }
            return this.findUserById(user.getId());
        } catch (error) {
            console.error("Error modifying user:", error);
            throw new Error("Failed to fetch modify user.");
        }
    }
    
    async deleteUser(user: User): Promise<boolean> {
        try {
            const query: string = "DELETE FROM users WHERE id = ?";

            // Delete the user from the database
            const [result] = await this.db.query<any>(
                query,
                [user.getId()]
            )
            
            // Return true if the user is deleted, false otherwise
            return result.affectedRows > 0;
        } catch (error) {
            console.error("Error fetching deleting user:", error);
            throw new Error("Failed to fetch delete user.");
        }
    }
}