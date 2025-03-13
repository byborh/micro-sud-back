import { InvoiceContract } from "../contracts/IInvoice";

export abstract class InvoiceAbstract implements InvoiceContract {
    id: string;
    transaction_id: string;
    createdAt: Date;
    pdf_link?: string;

    constructor(
        id: string,
        transaction_id: string,
        createdAt: Date,
        pdf_link?: string
    ) {
        this.id = id,
        this.transaction_id = transaction_id,
        this.createdAt = createdAt,
        this.pdf_link = pdf_link
    }
    
    getId(): string { return this.id; }
    getTransactionId(): string { return this.transaction_id; }
    getCreatedAt(): Date { return this.createdAt; }
    getPdfLink(): string { return this.pdf_link; }

    setId(id: string): void { this.id = id; }
    setTransactionId(transaction_id: string): void { this.transaction_id = transaction_id; }
    setCreatedAt(createdAt: Date): void { this.createdAt = createdAt; }
    setPdfLink(pdf_link: string): void { this.pdf_link = pdf_link; }
}