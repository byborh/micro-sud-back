import { AuthTokenRedisEntity } from "@modules/auth-token/entity/redis/AuthToken.entity";
import { IAuthTokenRepository } from "../contract/IAuthTokenRepository";
import { RedisClientType } from "redis";
import { IDatabase } from "@db/contract/IDatabase";


export class AuthTokenRepositoryRedis implements IAuthTokenRepository {
    private redisClient: RedisClientType;

    constructor(private db: IDatabase) {
        this.redisClient = db.getDataSoure();
    }

    createAuthToken(authToken: AuthTokenRedisEntity): Promise<AuthTokenRedisEntity> {
        throw new Error("Method not implemented.");
    }
    getAuthTokenByUserId(userId: string): Promise<AuthTokenRedisEntity | null> {
        throw new Error("Method not implemented.");
    }
    deleteAuthTokenByUserId(userId: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    getAllAuthTokens(): Promise<AuthTokenRedisEntity[] | null> {
        throw new Error("Method not implemented.");
    }
    deleteAuthTokenById(authTokenId: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}