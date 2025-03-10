import { DatabaseType } from "@db/contract/DatabaseType";
import { RefundRedisEntity } from "./redis/Refund.entity";
import { RefundContract } from "../contracts/IRefund";
import { RefundAbstract } from "./Refund.abstract";
import { RefundSQLEntity } from "./sql/Refund.entity";

const databaseType: DatabaseType = (process.env.MY_DB as DatabaseType) || "mysql"; // Default to MySQL if not specified


export async function createRefundEntity(refund: Partial<RefundContract>, dbType: DatabaseType = databaseType): Promise<RefundAbstract> {

    // Validate required fields
    if (!refund.id || !refund.transaction_id || !refund.amount || !refund.status) {
        throw new Error("Missing required fields for Refund.");
    }

    switch(dbType) {
        case "mysql":
        case "postgresql":
        case "sqlite":
        case "mariadb":
        case "mssql":
            return new RefundSQLEntity(refund);
        case "redis":
            return new RefundRedisEntity(refund);
        default:
            throw new Error("Unsupported database type.");
        
        // Add more cases for other database types that you want to support
    }
}