import { CreateToken } from "./createToken";
import { IRoleRepository } from "@modules/roles/repositories/contract/IRoleRepository";
import { IUserRolesRepository } from "@modules/user-roles/repositories/contract/IUserRolesRepository";
import { AuthTokenAbstract } from "@modules/auth-token/entity/AuthToken.abstract";
import { RoleAbstract } from "@modules/roles/entity/Role.abstract";
import { UserRolesAbstract } from "@modules/user-roles/entity/UserRoles.abstract";

export class CreateRoleAndTokenForUser {
    private static instance: CreateRoleAndTokenForUser;
    private roleRepository: IRoleRepository;
    private userRolesRepository: IUserRolesRepository;
    private createToken: CreateToken;

    private constructor(roleRepo: IRoleRepository, userRolesRepo: IUserRolesRepository, createToken: CreateToken) {
        this.roleRepository = roleRepo;
        this.userRolesRepository = userRolesRepo;
        this.createToken = createToken;
    }

    public static getInstance(
        roleRepository: IRoleRepository,
        userRolesRepository: IUserRolesRepository,
        createToken: CreateToken
    ): CreateRoleAndTokenForUser{
        if(!CreateRoleAndTokenForUser.instance) {
            CreateRoleAndTokenForUser.instance = new CreateRoleAndTokenForUser(roleRepository, userRolesRepository, createToken);
        }
        return CreateRoleAndTokenForUser.instance;
    }


    public async createRoleAndTokenForUser(userId: string): Promise<AuthTokenAbstract | null> {

        // Get ID of USER role
        const role: RoleAbstract = await this.roleRepository.getRoleByName('USER');
        const roleId: string = role.getId();

        // Create userRoles
        const userRoles: UserRolesAbstract = {user_id: userId, role_id: roleId} as UserRolesAbstract;

        // Insérer dans la bdd
        const userRolesEntity: UserRolesAbstract = await this.userRolesRepository.createUserRoles(userRoles);
        if(!userRolesEntity) throw new Error("UserRoles didn't created correctly.")

        // Appeler la fonction pour créer un token
        const authToken: AuthTokenAbstract = await this.createToken.createToken(userId, [roleId]);

        return authToken;
    }
}