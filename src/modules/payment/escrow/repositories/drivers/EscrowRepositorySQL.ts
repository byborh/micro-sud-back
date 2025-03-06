import { Repository } from "typeorm";
import { SQLDatabase } from "@db/drivers/sql.datasource";
import { IDatabase } from "@db/contract/IDatabase";
import { IEscrowRepository } from "../contract/IEscrowRepository";
import { EscrowAbstract } from "../../entity/Escrow.abstract";
import { EscrowSQLEntity } from "../../entity/sql/Escrow.entity";

export class EscrowRepositorySQL implements IEscrowRepository {
    private repository: Repository<EscrowSQLEntity>;

    constructor(private db: IDatabase) {
        const dataSource = db as SQLDatabase;
        this.repository = dataSource.getDataSource().getRepository(EscrowSQLEntity);
    }

    
    getEscrowById(userId: string): Promise<EscrowAbstract | null> {
        throw new Error("Method not implemented.");
    }
    getEscrows(): Promise<EscrowAbstract[] | null> {
        throw new Error("Method not implemented.");
    }
    createEscrow(escrow: EscrowAbstract): Promise<EscrowAbstract | null> {
        throw new Error("Method not implemented.");
    }
    releaseEscrow(escrow: EscrowAbstract): Promise<EscrowAbstract | null> {
        throw new Error("Method not implemented.");
    }
}
