import { UserRoles } from "@modules/user-roles/entity/typeorm/UserRoles.entity";
import { IUserRolesRepository } from "../contract/IUserRolesRepository";
import { IDatabase } from "@db/contract/IDatabase";


export class UserRolesRepositoryRedis implements IUserRolesRepository {
    private client: IUserRolesRepository;

    constructor(private db: IDatabase) {
        this.client = db.getDataSoure();
    }


    getUserRolesByMultipleFields(fields: string[], values: string[]): Promise<UserRoles[] | null> {
        throw new Error("Method not implemented.");
    }
    getUserRoles(): Promise<UserRoles[] | null> {
        throw new Error("Method not implemented.");
    }
    createUserRoles(userRoles: UserRoles): Promise<UserRoles | null> {
        throw new Error("Method not implemented.");
    }
}