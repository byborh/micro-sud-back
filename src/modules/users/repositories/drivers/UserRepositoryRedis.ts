import { IUserRepository } from "../contract/IUserRepository";
import { IDatabase } from "@db/contract/IDatabase";
import { RedisClientType } from "redis";
import { UserRedisEntity } from "@modules/users/entity/redis/User.entity";

export class UserRepositoryRedis implements IUserRepository {
    private client: RedisClientType;
    
    constructor(private db: IDatabase) {
        this.client = db.getDataSoure() as RedisClientType;
        this.initialize();
    }

    // Connect to database
    async initialize(): Promise<void> {
        try {
            if (!this.client.isOpen) {
                await this.client.connect();
            }
        } catch (error) {
            console.error('Failed to connect to Redis:', error);
            throw error;
        }
    }
    async findUserByField(field: string, value: string): Promise<UserRedisEntity | null> {
        const userData = await this.client.hGetAll(`user:${value}`);

        if (Object.keys(userData).length === 0) return null;
        
        return UserRedisEntity.fromRedisHash(userData);
    }

    async findUserById(userId: string): Promise<UserRedisEntity | null> {
        return this.findUserByField("id", userId);
    }

    async findUserByEmail(email: string): Promise<UserRedisEntity | null> {
        return this.findUserByField('email', email);
    }

    async getAllUsers(): Promise<UserRedisEntity[]> {
        const keys = await this.client.keys(`user:*`);
        const users: UserRedisEntity[] = [];

        for(const key of keys) {
            const userData = await this.client.hGetAll(key);
            users.push(UserRedisEntity.fromRedisHash(userData))
        }

        if(Object.keys(users).length === 0) return null;

        return users.length > 0 ? users : [];
    }

    async createUser(user: UserRedisEntity): Promise<UserRedisEntity | null> {
        await this.client.hSet(`user:${user.id}`, user.toRedisHash());
        
        const exists = await this.client.exists(`user:${user.id}`);
        
        if(exists === 1) return user;

        return null;
    }

    async modifyUser(user: UserRedisEntity): Promise<UserRedisEntity | null> {
        await this.client.hSet(`user:${user.id}`, user.toRedisHash());

        const exists = await this.client.exists(`user:${user.id}`);
        
        if(exists === 1) return user;

        return null;
    }
    async deleteUser(userId: string): Promise<boolean> {
        const result = await this.client.del(`user:${userId}`)
        
        return result > 0;
    }

}