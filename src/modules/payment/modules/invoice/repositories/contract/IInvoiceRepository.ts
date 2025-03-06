import { InvoiceAbstract } from "../../entity/Invoice.abstract";

export interface IInvoiceRepository {
    getInvoiceById(invoiceId: string): Promise<InvoiceAbstract | null>;
    getInvoiceByUserId(userId: string): Promise<InvoiceAbstract | null>;
    getInvoices(): Promise<InvoiceAbstract[]>;
    createInvoice(invoice: InvoiceAbstract): Promise<InvoiceAbstract | null>;
}