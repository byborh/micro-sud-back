import { DatabaseType } from "@db/contract/DatabaseType";
import { InvoiceRedisEntity } from "./redis/Invoice.entity";
import { InvoiceContract } from "../contracts/IInvoice";
import { InvoiceAbstract } from "./Invoice.abstract";
import { InvoiceSQLEntity } from "./sql/Invoice.entity";

const databaseType: DatabaseType = (process.env.MY_DB as DatabaseType) || "mysql"; // Default to MySQL if not specified


export async function createRoleEntity(invoice: Partial<InvoiceContract>, dbType: DatabaseType = databaseType): Promise<InvoiceAbstract> {

    // Validate required fields
    if (!invoice.id || !invoice.transaction_id || !invoice.createdAt) {
        throw new Error("Missing required fields for Invoice.");
    }

    switch(dbType) {
        case "mysql":
        case "postgresql":
        case "sqlite":
        case "mariadb":
        case "mssql":
            return new InvoiceSQLEntity(invoice);
        case "redis":
            return new InvoiceRedisEntity(invoice);
        default:
            throw new Error("Unsupported database type.");
        
        // Add more cases for other database types that you want to support
    }
}