import { Repository } from "typeorm";
import { SQLDatabase } from "@db/drivers/sql.datasource";
import { IDatabase } from "@db/contract/IDatabase";
import { ILogRepository } from "../contract/ILogRepository";
import { LogSQLEntity } from "../../entity/sql/Log.entity";
import { LogAbstract } from "../../entity/Log.abstract";

export class LogRepositorySQL implements ILogRepository {
    private repository: Repository<LogSQLEntity>;

    constructor(private db: IDatabase) {
        const dataSource = db as SQLDatabase;
        this.repository = dataSource.getDataSource().getRepository(LogSQLEntity);
    }
    
    getLogByUserId(userId: string): Promise<LogAbstract | null> {
        throw new Error("Method not implemented.");
    }
    getLogByTransactionId(transactionId: string): Promise<LogAbstract | null> {
        throw new Error("Method not implemented.");
    }
    getLogs(): Promise<LogAbstract[] | null> {
        throw new Error("Method not implemented.");
    }    
}
