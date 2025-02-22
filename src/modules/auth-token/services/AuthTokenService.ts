import { AuthTokenRepositorySQL } from "../repositories/drivers/AuthTokenRepositorySQL";
import { PasswordManager } from "@core/cryptography/PasswordManager";
import { UserRoles } from "@modules/user-roles/entity/sql/UserRoles.entity";
import { CreateToken } from "@core/auth/createToken";
import { getDatabase } from "@db/DatabaseClient";
import { IAuthTokenRepository } from "../repositories/contract/IAuthTokenRepository";
import { IUserRepository } from "@modules/users/repositories/contract/IUserRepository";
import { IUserRolesRepository } from "@modules/user-roles/repositories/contract/IUserRolesRepository";
import { getRepository } from "@core/db/databaseGuards";
import { AuthTokenRepositoryRedis } from "../repositories/drivers/AuthTokenRepositoryRedis";
import { AuthTokenAbstract } from "../entity/AuthToken.abstract";

export class AuthTokenService {
    private authTokenRepository: IAuthTokenRepository;
    private userRepository: IUserRepository;
    private userRoleRepository: IUserRolesRepository;

    constructor(authTokenRepository: IAuthTokenRepository, userRepository: IUserRepository, userRoleRepository: IUserRolesRepository) {
        this.authTokenRepository = authTokenRepository;
        this.userRepository = userRepository;
        this.userRoleRepository = userRoleRepository;
    }

    // Create authToken
    public async createAuthToken(email: string, password: string): Promise<string> {
        // Validation of email and password
        const user = await this.userRepository.findUserByEmail(email);

        // Verify if the password is correct
        if (user) {
            const passwordManager = PasswordManager.getInstance();
            const isPasswordValid: boolean = passwordManager.verifyPassword(
                password,
                user.getSalt(),
                user.getPassword()
            );

            // If password is different
            if (!isPasswordValid) {throw new Error("Invalid credentials : password is different");}
        } else {throw new Error("Invalid credentials : user not found");}

        // Verify if user has already a token
        const isAuthTokenExists = await this.authTokenRepository.getAuthTokenByUserId(user.getId());

        if(isAuthTokenExists) {
            const isAuthTokenDeleted = await this.authTokenRepository.deleteAuthTokenByUserId(user.getId());

            if(!isAuthTokenDeleted) throw new Error("Failed to delete existant AuthTokenAbstract.");
        }

        const userId: string = user.getId();

        // Get ID of roles
        const userRoles: UserRoles[] = await this.userRoleRepository.getUserRolesByMultipleFields(["user_id"], [userId]);
        if (!userRoles || userRoles.length === 0) throw new Error("User does not have a role.");

        const roleIds: string[] = userRoles.map(userRole => userRole.getRole_id());

        const myDB = await getDatabase();

        // Dependencies
        const authTokenRepository = getRepository(myDB, AuthTokenRepositorySQL, AuthTokenRepositoryRedis) as IAuthTokenRepository;
    
        const createToken = CreateToken.getInstance(authTokenRepository);
        const authToken: AuthTokenAbstract = await createToken.createToken(userId, roleIds);

        return authToken.getToken();
    }

    // Logout
    public async deleteAuthToken(): Promise<boolean> {
        // Décoder le token

        // Récupérer l'id d'user

        // Appeler la méthode "deleteAuthTokenByUserId"

        // Retourner true ou false
        return true;
    }

    // Récupérer un AuthTokenAbstract par userId
    public async getAuthTokenByUserId(userId: string): Promise<AuthTokenAbstract | null> {
        try {
            if (!userId) {throw new Error("User ID is required.");}

            const authToken = await this.authTokenRepository.getAuthTokenByUserId(userId);
            if (!authToken) {throw new Error("AuthTokenAbstract not found.");}

            return authToken;
        } catch (error) {
            console.error("Error finding AuthTokenAbstract in AuthTokenService:", error);
            throw new Error("Failed to find AuthTokenAbstract.");
        }
    }

    // Supprimer un AuthTokenAbstract par userId
    public async deleteAuthTokenByUserId(userId: string): Promise<boolean> {
        try {
            if (!userId) {throw new Error("User ID is required.");}

            const isDeleted = await this.authTokenRepository.deleteAuthTokenByUserId(userId);
            return isDeleted;
        } catch (error) {
            console.error("Error deleting AuthTokenAbstract in AuthTokenService:", error);
            throw new Error("Failed to delete AuthTokenAbstract.");
        }
    }

    // Récupérer tous les AuthTokens (administration)
    public async getAllAuthTokens(): Promise<AuthTokenAbstract[] | null> {
        try {
            const authTokens = await this.authTokenRepository.getAllAuthTokens();
            if (!authTokens || authTokens.length === 0) {
                return null;
            }
            return authTokens;
        } catch (error) {
            console.error("Error fetching all AuthTokens in AuthTokenService:", error);
            throw new Error("Failed to retrieve AuthTokens.");
        }
    }

    // Supprimer un AuthTokenAbstract par son ID
    public async deleteAuthTokenById(authTokenId: string): Promise<boolean> {
        try {
            if (!authTokenId) {
                throw new Error("AuthTokenAbstract ID is required.");
            }

            const isDeleted = await this.authTokenRepository.deleteAuthTokenById(authTokenId);
            return isDeleted;
        } catch (error) {
            console.error("Error deleting AuthTokenAbstract by ID in AuthTokenService:", error);
            throw new Error("Failed to delete AuthTokenAbstract.");
        }
    }
}