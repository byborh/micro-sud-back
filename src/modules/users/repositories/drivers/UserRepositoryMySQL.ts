import { User } from "@modules/users/domain/User";
import { IUserRepository } from "../contract/IUserRepository";
import { dbConfig } from "@db/config";
import { Pool, RowDataPacket, createPool, ResultSetHeader } from "mysql2/promise";


export class USerRepositoryMyQSL implements IUserRepository {
    private db: Pool;

    constructor() {
        // Creation of the connection MySQL witdh the pool of connections
        const {host, user, password, database, port} = dbConfig.mysql;

        this.db = createPool({
            host,
            user,
            password,
            database,
            port
        })
    }


    // Properties from the interface
    async findUserById(userId: string): Promise<User | null> {
        // Find a user by ID from the database
        const [rows] = await this.db.execute<RowDataPacket[]>(
            "SELECT * FROM users WHERE id = ? LIMIT 1",
            [userId]
        );

        // If the user is not found, return null
        if(!rows.length) return null;

        // Return the user
        const user = rows[0];
        return new User(user.id, user.email, user.password, user.firstname, user.lastname, user.pseudo, user.telnumber) || null;
    }

    async findUserByEmail(email: string): Promise<User | null> {
        // Find a user by Email from the database
        const [rows] = await this.db.execute<RowDataPacket[]>(
            "SELECT * FROM users WHERE email = ? LIMIT = 1",
            [email]
        );

        // if the user is not found, return null
        if(!rows.length) return null;

        // Return the user
        const user = rows[0];
        return new User(user.id, user.email, user.password, user.firstname, user.lastname, user.pseudo, user.telnumber) || null;
    }

    async getAllUsers(): Promise<Array<User> | null> {
        // Find all users from the database
        const [rows] = await this.db.execute<RowDataPacket[]>(
            "SELECT * FROM users",
        );

        // If users don't found, return null
        if(!rows.length) return null;

        // Retrun all users
        return rows.map(user => new User(user.id, user.email, user.password, user.firstname, user.lastname, user.pseudo, user.telnumber)) || null;
    }

    async createUser(user: User): Promise<User | null> {
        // Insert the user in the database
        const [result] = await this.db.execute<ResultSetHeader>(
            "INSERT INTO users (id, email, password, firstname, lastname, pseudo, telnumber) VALUES (?, ?, ?, ?, ?, ?, ?)",
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
    }

    async modifyUser(user: User): Promise<User | null> {
        const [result] = await this.db.execute<ResultSetHeader>(
            "UPDATE users SET email = ?, password = ?, firstname = ?, lastname = ?, pseudo = ?, telnumber = ? WHERE id = ?",
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
    }
    
    async deleteUser(user: User): Promise<boolean> {
        // Delete the user from the database
        const [result] = await this.db.execute<ResultSetHeader>(
            "DELETE FROM users WHERE id = ?",
            [user.getId()]
        )
        
        // Return true if the user is deleted, false otherwise
        return result.affectedRows > 0;
    }
}