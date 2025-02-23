import { IUserRolesRepository } from "../contract/IUserRolesRepository";
import { IDatabase } from "@db/contract/IDatabase";
import { UserRolesRedisEntity } from "@modules/user-roles/entity/redis/UserRoles.entity";
import { RedisClientType } from "redis";


export class UserRolesRepositoryRedis implements IUserRolesRepository {
    private client: RedisClientType;
    private isInitialized: Promise<void>;

    constructor(private db: IDatabase) {
        this.client = db.getDataSoure() as RedisClientType;
        this.isInitialized = this.initialized();
    }

    async initialized(): Promise<void> {
        try {
            if(!this.client.isOpen) {
                await this.client.connect();
            }
        } catch (error) {
            console.error("Failed to connect to Redis:", error);
        }
    }


    async getUserRolesByMultipleFields(fields: string[], values: string[]): Promise<UserRolesRedisEntity[] | null> {
        try {
            await this.isInitialized;
    
            const results: UserRolesRedisEntity[] = [];
    
            // If user_id is provided, get all its roles
            if (fields.includes("user_id")) {
                const userId = values[fields.indexOf("user_id")];
                const roleIds = await this.client.sMembers(`user_roles:${userId}`);
                results.push(...roleIds.map((roleId) => new UserRolesRedisEntity({user_id: userId, role_id: roleId})));
            }
    
            // If role_id is provided, get all its users
            if (fields.includes("role_id")) {
                const roleId = values[fields.indexOf("role_id")];
                const userIds = await this.client.sMembers(`role_users:${roleId}`);
                results.push(...userIds.map((userId) => new UserRolesRedisEntity({user_id: userId, role_id: roleId})));
            }

            return results.length > 0 ? results : null;
        } catch (error) {
            console.error("Error finding userRole in UserRolesRepositoryRedis:", error);
            throw error;
        }
    }
    
    async getUserRoles(): Promise<UserRolesRedisEntity[] | null> {
        try {
            await this.isInitialized;
    
            const userRoles: UserRolesRedisEntity[] = [];
            let cursor = 0;
    
            // Loop through all keys
            do {
                const reply = await this.client.scan(cursor, { MATCH: "user_roles:*", COUNT: 100 });
                cursor = reply.cursor;
                const keys = reply.keys;
    
                for (const key of keys) {
                    const userId = key.split(":")[1]; // Extraire l'ID de l'utilisateur
                    const roleIds = await this.client.sMembers(key);
    
                    for (const roleId of roleIds) {
                        userRoles.push(new UserRolesRedisEntity({user_id: userId, role_id: roleId}));
                    }
                }
            } while (cursor !== 0);
    
            return userRoles.length > 0 ? userRoles : null;
        } catch (error) {
            console.error("Error finding all userRoles in UserRolesRepositoryRedis:", error);
            throw error;
        }
    }

    async createUserRoles(userRoles: UserRolesRedisEntity): Promise<UserRolesRedisEntity | null> {
        try {
            await this.isInitialized;

            // Create userRoles in db
            await this.client.sAdd(`user_roles:${userRoles.user_id}`, userRoles.role_id);
            await this.client.sAdd(`role_users:${userRoles.role_id}`, userRoles.user_id);

            return userRoles;
        } catch (error) {
            console.error("Error creating userRoles in UserRolesRepositoryRedis:", error);
        }
    }

    async deleteUserRolesByMultipleFields(fields: string[], values: string[]): Promise<boolean> {
        try {
            await this.isInitialized;
            
            // If user_id is provided, delete all its roles
            if (fields.includes("user_id")) {
                const userId = values[fields.indexOf("user_id")];
                await this.client.del(`user_roles:${userId}`);
            }
    
            // If role_id is provided, delete all its users
            if (fields.includes("role_id")) {
                const roleId = values[fields.indexOf("role_id")];
                await this.client.del(`role_users:${roleId}`);
            }

            return true;
        } catch(error) {
            console.error("Error to delete UserRoles in UserRolesRepositoryRedis:", error);
        }
    }
}