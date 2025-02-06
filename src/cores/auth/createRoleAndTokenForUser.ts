import { UserRoles } from "@modules/user-roles/entity/UserRoles.entity";
import { RoleRepositoryMySQL } from "@modules/roles/repositories/drivers/RoleRepositoryMySQL";
import { Role } from "@modules/roles/entity/Role.entity";
import { UserRolesRepositoryMySQL } from "@modules/user-roles/repositories/drivers/UserRolesRepositoryMySQL";
import { AuthToken } from "@modules/auth-token/entity/AuthToken.entity";
import { CreateToken } from "./createToken";

export class CreateRoleAndTokenForUser {
    private static instance: CreateRoleAndTokenForUser;
    private roleRepository: RoleRepositoryMySQL;
    private userRolesRepository: UserRolesRepositoryMySQL;

    private constructor() {}

    public static getInstance(): CreateRoleAndTokenForUser {
        if(!CreateRoleAndTokenForUser.instance) {
            CreateRoleAndTokenForUser.instance = new CreateRoleAndTokenForUser();
        }
        return CreateRoleAndTokenForUser.instance;
    }


    public async createRoleAndTokenForUser(userId: string): Promise<AuthToken | null> {

        // Get ID of USER role
        const role: Role = await this.roleRepository.getRoleByName('USER');
        const roleId: string = role.getId();

        // Create userRoles
        const userRoles: UserRoles = new UserRoles(userId, roleId);

        // Insérer dans la bdd
        const userRolesEntity: UserRoles = await this.userRolesRepository.createUserRoles(userRoles);

        // Appeler la fonction pour créer un token
        const createToken = CreateToken.getInstance();
        const authToken: AuthToken = createToken.createToken(userId, [roleId]);

        return authToken;
    }
}