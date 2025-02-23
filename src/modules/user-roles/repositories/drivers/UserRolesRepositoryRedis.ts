import { UserRolesAbstract } from "@modules/user-roles/entity/UserRoles.abstract";
import { IUserRolesRepository } from "../contract/IUserRolesRepository";
import { IDatabase } from "@db/contract/IDatabase";
import { RedisClientType } from "redis";
import { UserRolesEntity } from "@modules/user-roles/entity/redis/UserRoles.entity";


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


    async getUserRolesByMultipleFields(fields: string[], values: string[]): Promise<UserRolesAbstract[] | null> {
        try {
            await this.isInitialized;
    
            const results: UserRolesAbstract[] = [];
    
            // If user_id is provided, get all its roles
            if (fields.includes("user_id")) {
                const userId = values[fields.indexOf("user_id")];
                const roleIds = await this.client.sMembers(`user_roles:${userId}`);
                results.push(...roleIds.map((roleId) => new UserRolesEntity(userId, roleId)));
            }
    
            // If role_id is provided, get all its users
            if (fields.includes("role_id")) {
                const roleId = values[fields.indexOf("role_id")];
                const userIds = await this.client.sMembers(`role_users:${roleId}`);
                results.push(...userIds.map((userId) => new UserRolesEntity(userId, roleId)));
            }

            return results.length > 0 ? results : null;
        } catch (error) {
            console.error("Error finding userRole in UserRolesRepositoryRedis:", error);
            throw error;
        }
    }
    
    async getUserRoles(): Promise<UserRolesAbstract[] | null> {
        try {
            await this.isInitialized;
    
            const userRoles: UserRolesAbstract[] = [];
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
                        userRoles.push(new UserRolesEntity(userId, roleId));
                    }
                }
            } while (cursor !== 0);
    
            return userRoles.length > 0 ? userRoles : null;
        } catch (error) {
            console.error("Error finding all userRoles in UserRolesRepositoryRedis:", error);
            throw error;
        }
    }

    async createUserRoles(userRoles: UserRolesAbstract): Promise<UserRolesAbstract | null> {
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