import { User } from "@modules/users/domain/User";
import { IUserRepository } from "../contract/IUserRepository";
import { dbConfig } from "@db/config";
import { Pool, createPool } from "mysql2/promise";


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


    // Properties from the interface | CHANGE IT BRO
    findUserById(userId: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    findUserByEmail(email: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    getAllUsers(): Promise<Array<User>> {
        throw new Error("Method not implemented.");
    }
    createUser(user: User): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    modifyUser(user: User): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    deleteUser(user: User): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}