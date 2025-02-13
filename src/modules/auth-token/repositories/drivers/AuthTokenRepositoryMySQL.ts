import { AuthToken } from "@modules/auth-token/entity/typeorm/AuthToken.entity";
import { IAuthTokenRepository } from "../contract/IAuthTokenRepository";
import { Repository } from "typeorm";
import { MySQLDatabase } from "@db/drivers/mysql.datasource";
import { IDatabase } from "@db/contract/IDatabase";

export class AuthTokenRepositoryMySQL implements IAuthTokenRepository {
    private repository: Repository<AuthToken>;

    constructor(private db: IDatabase) {
        const dataSource = db as MySQLDatabase;
        this.repository = dataSource.getDataSoure().getRepository(AuthToken);
    }

    async createAuthToken(authToken: AuthToken): Promise<AuthToken> {
        const result = await this.repository.save(authToken);
        return result || null;
    }

    async getAuthTokenByUserId(userId: string): Promise<AuthToken | null> {
        if (!userId) return null;
        return await this.repository.findOne({ where: { user_id: userId } }) || null;
    }

    async deleteAuthTokenByUserId(userId: string): Promise<boolean> {
        if (!userId) return false;
        const result = await this.repository.delete({ user_id: userId });
        return result.affected !== 0;
    }

    async getAllAuthTokens(): Promise<AuthToken[]> {
        return await this.repository.find();
    }
    
    async deleteAuthTokenById(authTokenId: string): Promise<boolean> {
        if (!authTokenId) return false;
        const result = await this.repository.delete(authTokenId);
        return result.affected !== 0;
    }
}
