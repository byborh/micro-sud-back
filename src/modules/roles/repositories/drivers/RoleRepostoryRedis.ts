import { IRoleRepository } from "../contract/IRoleRepository";
import { RedisClientType } from "@redis/client";
import { IDatabase } from "@db/contract/IDatabase";
import { RoleAbstract } from "@modules/roles/entity/Role.abstract";

export class RoleRepositoryRedis implements IRoleRepository {
    private client: RedisClientType;

    constructor(private db: IDatabase) {
        this.client = db.getDataSoure();
    }

    getRoleByField(field: string, value: string): Promise<RoleAbstract | null> {
        throw new Error("Method not implemented.");
    }
    getRoleById(roleId: string): Promise<RoleAbstract | null> {
        throw new Error("Method not implemented.");
    }
    getRoleByName(name: string): Promise<RoleAbstract | null> {
        throw new Error("Method not implemented.");
    }
    getRoles(): Promise<RoleAbstract[] | null> {
        throw new Error("Method not implemented.");
    }
    createRole(role: RoleAbstract): Promise<RoleAbstract | null> {
        throw new Error("Method not implemented.");
    }
    modifyRole(role: RoleAbstract): Promise<RoleAbstract | null> {
        throw new Error("Method not implemented.");
    }
    deleteRole(roleId: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
}