import { DatabaseType } from "@db/contract/DatabaseType";
import { TransactionRedisEntity } from "./redis/Transaction.entity";
import { TransactionContract } from "../contracts/ITransaction";
import { TransactionAbstract } from "./Transaction.abstract";
import { TransactionSQLEntity } from "./sql/Transaction.entity";

const databaseType: DatabaseType = (process.env.MY_DB as DatabaseType) || "mysql"; // Default to MySQL if not specified


export async function createRoleEntity(transaction: Partial<TransactionContract>, dbType: DatabaseType = databaseType): Promise<TransactionAbstract> {

    // Validate required fields
    if (!transaction.id || !transaction.amount || !transaction.currency || !transaction.payment_provider || !transaction.debtor_email || !transaction.beneficiary_email || !transaction.status || !transaction.transaction_date) {
        throw new Error("Missing required fields for Transaction.");
    }

    switch(dbType) {
        case "mysql":
        case "postgresql":
        case "sqlite":
        case "mariadb":
        case "mssql":
            return new TransactionSQLEntity(transaction);
        case "redis":
            return new TransactionRedisEntity(transaction);
        default:
            throw new Error("Unsupported database type.");
        
        // Add more cases for other database types that you want to support
    }
}