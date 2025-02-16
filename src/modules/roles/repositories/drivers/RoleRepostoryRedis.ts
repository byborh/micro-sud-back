import { Role } from "@modules/roles/entity/typeorm/Role.entity";
import { IRoleRepository } from "../contract/IRoleRepository";
import { RedisClientType } from "@redis/client";
import { IDatabase } from "@db/contract/IDatabase";

export class RoleRepositoryRedis implements IRoleRepository {
    private client: RedisClientType;

    constructor(private db: IDatabase) {
        this.client = db.getDataSoure();
    }

    getRoleByField(field: string, value: string): Promise<Role | null> {
        throw new Error("Method not implemented.");
    }
    getRoleById(roleId: string): Promise<Role | null> {
        throw new Error("Method not implemented.");
    }
    getRoleByName(name: string): Promise<Role | null> {
        throw new Error("Method not implemented.");
    }
    getRoles(): Promise<Role[] | null> {
        throw new Error("Method not implemented.");
    }
    createRole(role: Role): Promise<Role | null> {
        throw new Error("Method not implemented.");
    }
    modifyRole(role: Role): Promise<Role | null> {
        throw new Error("Method not implemented.");
    }
    deleteRole(roleId: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
}