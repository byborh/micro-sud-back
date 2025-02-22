import { IRoleRepository } from "../contract/IRoleRepository";
import { RedisClientType } from "@redis/client";
import { IDatabase } from "@db/contract/IDatabase";
import { RoleRedisEntity } from "@modules/roles/entity/redis/Role.entity";

export class RoleRepositoryRedis implements IRoleRepository {
    private client: RedisClientType;
    private isInitialize: Promise<void>;

    constructor(private db: IDatabase) {
        this.client = db.getDataSoure() as RedisClientType;
    }

    async initialize(): Promise<void> {
        try {
            if(!this.client.isOpen) {
                await this.client.connect();
            }
        } catch (error) {
            console.error("Failed to connect to Redis:", error);
            throw error;
        }
    }

    async getRoleByField(field: string, value: string): Promise<RoleRedisEntity | null> {
        try {
            await this.isInitialize;

            const role = await this.client.hGetAll(`role:${value}`);

            return Object.keys(role).length > 0 ? RoleRedisEntity.fromRedisHash(role) : null;
        } catch(error) {
            console.error("Failed to find role by field:", error);
        }
    }

    async getRoleById(roleId: string): Promise<RoleRedisEntity | null> {
        return this.getRoleByField('id', roleId) || null;
    }

    async getRoleByName(name: string): Promise<RoleRedisEntity | null> {
        return this.getRoleByField('name', name) || null;
    }

    async getRoles(): Promise<RoleRedisEntity[] | null> {
        try {
            await this.isInitialize;
            
            const roles: RoleRedisEntity[] = [];
            let cursor: number = 0;

            do {
                const reply = await this.client.scan(cursor, {MATCH: "role:*", COUNT: 100});
                cursor = reply.cursor;
                const keys = reply.keys;

                for(const key of keys) {
                    const roleData = await this.client.hGetAll(key);
                    roles.push(RoleRedisEntity.fromRedisHash(roleData));
                }
            } while(cursor !== 0);

            return roles;
        } catch(error) {
            console.error("Failed to find role by field:", error);
        }
    }

    async createRole(role: RoleRedisEntity): Promise<RoleRedisEntity | null> {
        try {
            await this.isInitialize;
            // Create role in db
            const roleData = await this.client.hSet(`role:${role.id}`, role.toRedisHash());
            // Verify if role was created
            const exists = await this.client.exists(`role:${role.id}`);
            
            return exists === 1 ? role : null;
        } catch(error) {
            console.error("Failed to find role by field:", error);
        }
    }

    async modifyRole(role: RoleRedisEntity): Promise<RoleRedisEntity | null> {
        try {
            await this.isInitialize;
            // Modify role in db
            const roleData = await this.client.hSet(`role:${role.id}`, role.toRedisHash());
            // Verify if role was modified
            const exists = await this.client.exists(`role:${role.id}`);
            
            return exists === 1 ? role : null;
        } catch(error) {
            console.error("Failed to find role by field:", error);
        }
    }

    async deleteRole(roleId: string): Promise<boolean> {
        try {
            await this.isInitialize;
            const roleDel = await this.client.del(`role:${roleId}`);
            // A SUPPRIMER AUSSI LES ROLES QUI UTILISENT LES UTILISATEURS !!!
            return roleDel > 0;
        } catch(error) {
            console.error("Failed to find role by field:", error);
        }
    }
    
}