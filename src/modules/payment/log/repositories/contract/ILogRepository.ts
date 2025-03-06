import { LogAbstract } from "../../entity/Log.abstract";

export interface ILogRepository {
    getLogByUserId(userId: string): Promise<LogAbstract | null>;
    getLogByTransactionId(transactionId: string): Promise<LogAbstract | null>;
    getLogs(): Promise<LogAbstract[] | null>;
}