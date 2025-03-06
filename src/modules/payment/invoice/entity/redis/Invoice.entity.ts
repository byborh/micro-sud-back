import { InvoiceAbstract } from "../Invoice.abstract";
import { InvoiceContract } from "../../contracts/IInvoice";

export class InvoiceRedisEntity extends InvoiceAbstract {
    id: string;
    transaction_id: string;
    user_id: string;
    amount: number;
    pdf_link: string;

    data: Record<string, any> | null;

    constructor(data: Partial<InvoiceContract>) {
        super(
            data?.id ?? "",
            data?.transaction_id ?? "",
            data?.user_id ?? "",
            data?.amount ?? 0,
            data?.pdf_link ?? ""
        );
        this.id = data?.id ?? "";
        this.transaction_id = data?.transaction_id ?? "";
        this.user_id = data?.user_id ?? "";
        this.amount = data?.amount ?? 0;
        this.pdf_link = data?.pdf_link ?? "";        
    }

    // Convert object to Redis hash
    toRedisHash(): { [key: string]: string } {
        return {
            id: this.id,
            transaction_id: this.transaction_id,
            user_id: this.user_id,
            amount: this.amount.toString(),
            pdf_link: this.pdf_link            
        }
    }

    // Convert Redis hash to object
    static fromRedisHash(hash: { [key: string]: string }): InvoiceRedisEntity {
        return new InvoiceRedisEntity({
            id: hash.id,
            transaction_id: hash.transaction_id,
            user_id: hash.user_id,
            amount: parseFloat(hash.amount),
            pdf_link: hash.pdf_link
        })
    }
}