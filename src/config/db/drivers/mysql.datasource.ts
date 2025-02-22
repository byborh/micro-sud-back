import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { UserSQLEntity } from "@modules/users/entity/sql/User.entity";
import { RoleSQLEntity } from "@modules/roles/entity/sql/Role.entity";
import { AuthTokenSqlEntity } from "@modules/auth-token/entity/sql/AuthToken.entity";
import { ChatAISQLEntity } from "@modules/chat-ai/entity/sql/ChatAI.entity";
import { IDatabase } from "@db/contract/IDatabase";
import { UserRolesEntity } from "@modules/user-roles/entity/sql/UserRoles.entity";


dotenv.config();

export class MySQLDatabase implements IDatabase {
    // Get DataSource instance
    private dataSource: DataSource;

    constructor() {
        this.dataSource = new DataSource({
            type: "mysql",
            host: process.env.MYSQL_HOST || "localhost",
            port: Number(process.env.MYSQL_PORT) || 3306,
            username: process.env.MYSQL_USER || "root",
            password: process.env.MYSQL_PASSWORD || "",
            database: process.env.MYSQL_DATABASE || "datte",
            entities: [UserSQLEntity, RoleSQLEntity, UserRolesEntity, AuthTokenSqlEntity, ChatAISQLEntity],  // ADD ALL ENTITIES HERE
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