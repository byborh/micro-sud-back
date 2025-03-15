import { InvoiceAbstract } from "../../entity/Invoice.abstract";

export interface IInvoiceRepository {
    getInvoiceByTransactionId(transactionId: string): Promise<InvoiceAbstract | null>;
    createInvoice(invoice: InvoiceAbstract): Promise<InvoiceAbstract | null>;
}