import { Repository } from "typeorm";
import { SQLDatabase } from "@db/drivers/sql.datasource";
import { IDatabase } from "@db/contract/IDatabase";
import { IInvoiceRepository } from "../contract/IInvoiceRepository";
import { InvoiceSQLEntity } from "../../entity/sql/Invoice.entity";
import { InvoiceAbstract } from "../../entity/Invoice.abstract";

export class InvoiceRepositorySQL implements IInvoiceRepository {
    private repository: Repository<InvoiceSQLEntity>;

    constructor(private db: IDatabase) {
        const dataSource = db as SQLDatabase;
        this.repository = dataSource.getDataSource().getRepository(InvoiceSQLEntity);
    }

    
    getInvoiceByTransactionId(invoiceId: string): Promise<InvoiceAbstract | null> {
        throw new Error("Method not implemented.");
    }

    createInvoice(invoice: InvoiceAbstract): Promise<InvoiceAbstract | null> {
        throw new Error("Method not implemented.");
    }
}
