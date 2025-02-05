import { UserRepositoryMySQL } from "@modules/users/repositories/drivers/UserRepositoryMySQL";
import { AuthToken } from "../entity/AuthToken.entity";
import { AuthTokenRepositoryMySQL } from "../repositories/drivers/AuthTokenRepositoryMySQL";
import { PasswordManager } from "@core/cryptography/PasswordManager";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import { IdGenerator } from "@core/idGenerator";

export class AuthTokenService {
    private authTokenRepository: AuthTokenRepositoryMySQL;
    private userRepository: UserRepositoryMySQL;

    constructor(authTokenRepository: AuthTokenRepositoryMySQL, userRepository: UserRepositoryMySQL) {
        this.authTokenRepository = authTokenRepository;
        this.userRepository = userRepository;
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
        if (isAuthTokenExists) {throw new Error("User already has an AuthToken.");}

        // Get the private key
        const privateKeyPath = path.join(__dirname, "../../../../ec_private.pem");
        const privateKey: string = fs.readFileSync(privateKeyPath, "utf8");

        // Generate an ID for the token
        const idGenerator = IdGenerator.getInstance();
        const authTokenId: string = idGenerator.generateId(16);

        // Definition of dates
        const createdAt: Date = new Date();
        const expiresAt: Date = new Date(createdAt.getTime() + 3600 * 1000); // Expiration dans 1h

        const userId: string = user.getId();

        // Payload of JWT
        const payload = {
            sub: userId,        // ID of user
            jti: authTokenId,  // JWT ID unique
            iat: Math.floor(createdAt.getTime() / 1000), // Issued At
            exp: Math.floor(expiresAt.getTime() / 1000), // Expiration
        };

        // Generation of JWT signed with ES256
        const token = jwt.sign(payload, privateKey, {
            algorithm: "ES256",
        });

        // Stock the token ID in the database
        const authToken = new AuthToken(authTokenId, userId, token, createdAt, expiresAt);

        await this.authTokenRepository.createAuthToken(authToken);
    
        return token;
    }

    // Récupérer un AuthToken par userId
    public async getAuthTokenByUserId(userId: string): Promise<AuthToken | null> {
        try {
            if (!userId) {throw new Error("User ID is required.");}

            const authToken = await this.authTokenRepository.getAuthTokenByUserId(userId);
            if (!authToken) {throw new Error("AuthToken not found.");}

            return authToken;
        } catch (error) {
            console.error("Error finding AuthToken in AuthTokenService:", error);
            throw new Error("Failed to find AuthToken.");
        }
    }

    // Supprimer un AuthToken par userId
    public async deleteAuthTokenByUserId(userId: string): Promise<boolean> {
        try {
            if (!userId) {throw new Error("User ID is required.");}

            const isDeleted = await this.authTokenRepository.deleteAuthTokenByUserId(userId);
            return isDeleted;
        } catch (error) {
            console.error("Error deleting AuthToken in AuthTokenService:", error);
            throw new Error("Failed to delete AuthToken.");
        }
    }

    // Récupérer tous les AuthTokens (administration)
    public async getAllAuthTokens(): Promise<AuthToken[] | null> {
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

    // Supprimer un AuthToken par son ID
    public async deleteAuthTokenById(authTokenId: string): Promise<boolean> {
        try {
            if (!authTokenId) {
                throw new Error("AuthToken ID is required.");
            }

            const isDeleted = await this.authTokenRepository.deleteAuthTokenById(authTokenId);
            return isDeleted;
        } catch (error) {
            console.error("Error deleting AuthToken by ID in AuthTokenService:", error);
            throw new Error("Failed to delete AuthToken.");
        }
    }
}