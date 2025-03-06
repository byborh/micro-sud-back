import { LogAbstract } from "../entity/Log.abstract";
import { ILogRepository } from "../repositories/contract/ILogRepository";

export class LogService {
    private logRepository: ILogRepository;

    constructor(logRepository: ILogRepository) {
        this.logRepository = logRepository;
    }

    // Get Log By User Id
    public async getLogByUserId(userId: string): Promise<LogAbstract | null> {
        try {
            return await this.logRepository.getLogByUserId(userId);
        } catch (error) {
            console.error("Error finding log in LogService:", error);
            throw new Error("Failed to find log.");
        }
    }

    // Get Log By Id
    public async getLogByTransactionId(logId: string): Promise<LogAbstract | null> {
        try {
            return await this.logRepository.getLogByTransactionId(logId);
        } catch (error) {
            console.error("Error finding log in LogService:", error);
            throw new Error("Failed to find log.");
        }
    }

    // Get All Logs
    public async getLogs(): Promise<LogAbstract[] | null> {
        try {
            return await this.logRepository.getLogs();
        } catch (error) {
            console.error("Error finding all logs in LogService:", error);
            throw new Error("Failed to find all logs.");
        }
    }
}
