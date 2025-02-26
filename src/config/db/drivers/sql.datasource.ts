import "reflect-metadata";
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { UserSQLEntity } from "@modules/users/entity/sql/User.entity";
import { RoleSQLEntity } from "@modules/roles/entity/sql/Role.entity";
import { AuthTokenSQLEntity } from "@modules/auth-token/entity/sql/AuthToken.entity";
import { ChatAISQLEntity } from "@modules/chat-ai/entity/sql/ChatAI.entity";
import { IDatabase } from "@db/contract/IDatabase";
import { UserRolesSQLEntity } from "@modules/user-roles/entity/sql/UserRoles.entity";


dotenv.config();

export class SQLDatabase implements IDatabase {
    // Get DataSource instance
    private dataSource: DataSource;

    constructor() {
        // Get type of database from .env
        const dbType = process.env.MY_DB || "mysql"; // Default to MySQL if not specified
        let dbConfig: any;

        // Switch between database types
        switch(dbType) {
            case "mysql":
            case "mariadb":
                dbConfig = {
                    type: "mysql",
                    host: process.env.MYSQL_HOST || "localhost",
                    port: Number(process.env.MYSQL_PORT) || 3306,
                    username: process.env.MYSQL_USER || "root",
                    password: process.env.MYSQL_PASSWORD || "",
                    database: process.env.MYSQL_DATABASE || "datte",
                };
                break;
            case "postgresql":
                dbConfig = {
                    type: "postgres",
                    host: process.env.POSTGRES_HOST || "localhost",
                    port: Number(process.env.POSTGRES_PORT) || 5432,
                    username: process.env.POSTGRES_USER || "postgres",
                    password: process.env.POSTGRES_PASSWORD || "",
                    database: process.env.POSTGRES_DATABASE || "datte",
                };
                break;
            case "sqlite":
                dbConfig = {
                    type: "sqlite",
                    database: process.env.SQLITE_DATABASE || "./database.sqlite",
                };
                break;
            case "mssql":
                dbConfig = {
                    type: "mssql",
                    host: process.env.MSSQL_HOST || "localhost",
                    port: Number(process.env.MSSQL_PORT) || 1433,
                    username: process.env.MSSQL_USER || "sa",
                    password: process.env.MSSQL_PASSWORD || "",
                    database: process.env.MSSQL_DATABASE || "datte",
                };
                break;
            default:
                throw new Error(`Unsupported database type: ${dbType}`);
        }

        this.dataSource = new DataSource({
            ...dbConfig,
            entities: [UserSQLEntity, RoleSQLEntity, UserRolesSQLEntity, AuthTokenSQLEntity, ChatAISQLEntity],  // ADD ALL ENTITIES HERE
            synchronize: process.env.NODE_ENV !== "production",   // ATTENTION
            logging: process.env.NODE_ENV === "development",     // ATTENTION
        })
    }

    // Connect to database
    async connect(): Promise<void> {
        if(!this.dataSource.isInitialized) {
            await this.dataSource.initialize();
            console.log("✅ MySQL Database connected");
        }
    }

    // Disconnect from database
    async disconnect(): Promise<void> {
        if(this.dataSource.isInitialized) {
            await this.dataSource.destroy();
            console.log("❌ MySQL Database disconnected");
        }
    }


    // Verify if database is connected
    isConnected(): boolean { return this.dataSource.isInitialized; }
    
    // Get DataSource
    getDataSoure(): DataSource { return this.dataSource; }
}