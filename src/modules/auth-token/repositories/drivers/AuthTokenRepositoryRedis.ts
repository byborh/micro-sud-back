import { AuthToken } from "@modules/auth-token/entity/typeorm/AuthToken.entity";
import { IAuthTokenRepository } from "../contract/IAuthTokenRepository";
import { RedisClientType } from "redis";
import { RedisDatabase } from "@db/drivers/redis.datasource";
import { IDatabase } from "@db/contract/IDatabase";


export class AuthTokenRepositoryRedis implements IAuthTokenRepository {
    private redisClient: RedisClientType;

    constructor(private db: IDatabase) {
        this.redisClient = db.getDataSoure();
    }

    createAuthToken(authToken: AuthToken): Promise<AuthToken> {
        throw new Error("Method not implemented.");
    }
    getAuthTokenByUserId(userId: string): Promise<AuthToken | null> {
        throw new Error("Method not implemented.");
    }
    deleteAuthTokenByUserId(userId: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    getAllAuthTokens(): Promise<AuthToken[] | null> {
        throw new Error("Method not implemented.");
    }
    deleteAuthTokenById(authTokenId: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}