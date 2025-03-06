import { InvoiceContract } from "../contracts/IInvoice";

export abstract class InvoiceAbstract implements InvoiceContract {
    id: string;
  transaction_id: string;
  user_id: string;
  amount: number;
  pdf_link: string;

    constructor(
        id: string,
        transaction_id: string,
        user_id: string,
        amount: number,
        pdf_link: string
    ) {
        this.id = id,
        this.transaction_id = transaction_id,
        this.user_id = user_id,        
        this.amount = amount,
        this.pdf_link = pdf_link
    }

    
    getId(): string { return this.id; }
    getTransactionId(): string { return this.transaction_id; }
    getUserId(): string { return this.user_id; }
    getAmount(): number { return this.amount; }
    getPdfLing(): string { return this.pdf_link; }

    setId(id: string): void { this.id = id; }
    setTransactionId(transaction_id: string): void { this.transaction_id = transaction_id; }
    setUserId(user_id: string): void { this.user_id = user_id; }
    setAmount(amount: number): void { this.amount = amount; }
    setPdfLink(pdf_link: string): void { this.pdf_link = pdf_link; }
}