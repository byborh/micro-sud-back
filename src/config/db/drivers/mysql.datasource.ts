import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "@modules/users/entity/typeorm/User.entity";
import { Role } from "@modules/roles/entity/typeorm/Role.entity";
import { UserRoles } from "@modules/user-roles/entity/typeorm/UserRoles.entity";
import { AuthTokenTypeORM } from "@modules/auth-token/entity/typeorm/AuthToken.entity";
import { ChatAITypeORM } from "@modules/chat-ai/entity/typeorm/ChatAI.entity";
import { IDatabase } from "@db/contract/IDatabase";


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
            entities: [User, Role, UserRoles, AuthTokenTypeORM, ChatAITypeORM],  // ADD ALL ENTITIES
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