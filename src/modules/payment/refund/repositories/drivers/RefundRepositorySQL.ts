import { Repository } from "typeorm";
import { SQLDatabase } from "@db/drivers/sql.datasource";
import { IDatabase } from "@db/contract/IDatabase";
import { IRefundRepository } from "../contract/IRefundRepository";
import { RefundAbstract } from "../../entity/Refund.abstract";
import { RefundSQLEntity } from "../../entity/sql/Refund.entity";

export class RefundRepositorySQL implements IRefundRepository {
    private repository: Repository<RefundSQLEntity>;

    constructor(private db: IDatabase) {
        const dataSource = db as SQLDatabase;
        this.repository = dataSource.getDataSource().getRepository(RefundSQLEntity);
    }
    
    getRefundById(refundId: string): Promise<RefundAbstract | null> {
        throw new Error("Method not implemented.");
    }
    getRefunds(): Promise<RefundAbstract[] | null> {
        throw new Error("Method not implemented.");
    }
    createRefund(refund: RefundAbstract): Promise<RefundAbstract | null> {
        throw new Error("Method not implemented.");
    }
}
