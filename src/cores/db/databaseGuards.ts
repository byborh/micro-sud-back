import { IDatabase } from "@db/contract/IDatabase";
import { MySQLDatabase } from "@db/drivers/mysql.datasource";
import { RedisDatabase } from "@db/drivers/redis.datasource";

// Function to check if the database is of type MySQL
function isMySQLDatabase(db: IDatabase): db is MySQLDatabase {
    return db instanceof MySQLDatabase; // Verifies if the db instance is of type MySQLDatabase
}

// Function to check if the database is of type Redis
function isRedisDatabase(db: IDatabase): db is RedisDatabase {
    return db instanceof RedisDatabase; // Verifies if the db instance is of type RedisDatabase
}

// Generic interface for repositories that accept a specific type of database
interface IRepository<T extends IDatabase> {
    new (db: T): any; // Constructor signature for creating a repository with the provided database type
}

// Function to get the appropriate repository based on the database type
export function getRepository<T extends IDatabase, R>(
    myDB: T,                    // The database instance to use (either MySQL or Redis)
    mysqlRepo: IRepository<MySQLDatabase>,  // Repository class for MySQL
    redisRepo: IRepository<RedisDatabase>   // Repository class for Redis
): R {
    // If the database is MySQL, create and return the corresponding MySQL repository
    if (isMySQLDatabase(myDB)) {
        return new mysqlRepo(myDB as MySQLDatabase) as R;  // Cast to MySQLDatabase and instantiate the repository
    } 
    // If the database is Redis, create and return the corresponding Redis repository
    else if (isRedisDatabase(myDB)) {
        return new redisRepo(myDB as RedisDatabase) as R;  // Cast to RedisDatabase and instantiate the repository
    }
    // If the database type is unsupported, throw an error
    throw new Error(`Unsupported database type: ${myDB.constructor.name}`);
}
