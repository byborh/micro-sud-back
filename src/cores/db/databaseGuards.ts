import { IDatabase } from "@db/contract/IDatabase";
import { MySQLDatabase } from "@db/drivers/mysql.datasource";
import { RedisDatabase } from "@db/drivers/redis.datasource";

// Verify if the database is MySQL or Redis
function isMySQLDatabase(db: IDatabase): db is MySQLDatabase {return db instanceof MySQLDatabase;}

function isRedisDatabase(db: IDatabase): db is RedisDatabase {return db instanceof RedisDatabase;}

interface IRepository<T extends IDatabase> {
    new (db: T) : any;
}

export function getRepository<T extends IDatabase, R>(
    myDB: T,
    mysqlRepo: IRepository<MySQLDatabase>,
    redisRepo: IRepository<RedisDatabase>
): R {
    if (isMySQLDatabase(myDB)) {
        return new mysqlRepo(myDB as MySQLDatabase) as R;
    } else if (isRedisDatabase(myDB)) {
        return new redisRepo(myDB as RedisDatabase) as R;
    }
    throw new Error(`Unsupported database type: ${myDB.constructor.name}`);
}
