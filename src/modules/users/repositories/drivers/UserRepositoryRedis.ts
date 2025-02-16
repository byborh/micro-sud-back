import { User } from "@modules/users/entity/typeorm/User.entity";
import { IUserRepository } from "../contract/IUserRepository";
import { IDatabase } from "@db/contract/IDatabase";
import { RedisClientType } from "redis";


export class UserRepositoryRedis implements IUserRepository {
    private client: RedisClientType;
    
    constructor(private db: IDatabase) {
        this.client = db.getDataSoure();
    }

    findUserByField(field: string, value: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    findUserById(userId: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    findUserByEmail(email: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    getAllUsers(): Promise<Array<User> | null> {
        throw new Error("Method not implemented.");
    }
    createUser(user: User): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    modifyUser(user: User): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    deleteUser(userId: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}