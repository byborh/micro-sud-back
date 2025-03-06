import { DatabaseType } from "@db/contract/DatabaseType";
import { EscrowRedisEntity } from "./redis/Escrow.entity";
import { EscrowContract } from "../contracts/IEscrow";
import { EscrowAbstract } from "./Escrow.abstract";
import { EscrowSQLEntity } from "./sql/Escrow.entity";

const databaseType: DatabaseType = (process.env.MY_DB as DatabaseType) || "mysql"; // Default to MySQL if not specified


export async function createRoleEntity(escrow: Partial<EscrowContract>, dbType: DatabaseType = databaseType): Promise<EscrowAbstract> {

    // Validate required fields
    if (!escrow.id || !escrow.amount || !escrow.transaction_id || !escrow.release_date || !escrow.status) {
        throw new Error("Missing required fields for Escrow.");
    }

    switch(dbType) {
        case "mysql":
        case "postgresql":
        case "sqlite":
        case "mariadb":
        case "mssql":
            return new EscrowSQLEntity(escrow);
        case "redis":
            return new EscrowRedisEntity(escrow);
        default:
            throw new Error("Unsupported database type.");
        
        // Add more cases for other database types that you want to support
    }
}