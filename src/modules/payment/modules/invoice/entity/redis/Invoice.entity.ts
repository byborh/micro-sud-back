import { InvoiceAbstract } from "../Invoice.abstract";
import { InvoiceContract } from "../../contracts/IInvoice";

export class InvoiceRedisEntity extends InvoiceAbstract {
    id: string;
    transaction_id: string;
    createdAt: Date;
    pdf_link?: string;

    data: Record<string, any> | null;

    constructor(data: Partial<InvoiceContract>) {
        super(
            data?.id ?? "",
            data?.transaction_id ?? "",
            data?.createdAt ?? new Date(),
            data?.pdf_link ?? ""
        );
        this.id = data?.id ?? "";
        this.transaction_id = data?.transaction_id ?? "";
        this.createdAt = data?.createdAt ?? new Date();
        this.pdf_link = data?.pdf_link ?? "";        
    }

    // Convert object to Redis hash
    toRedisHash(): { [key: string]: string } {
        return {
            id: this.id,
            transaction_id: this.transaction_id,
            createdAt: this.createdAt.toISOString(),
            pdf_link: this.pdf_link            
        }
    }

    // Convert Redis hash to object
    static fromRedisHash(hash: { [key: string]: string }): InvoiceRedisEntity {
        return new InvoiceRedisEntity({
            id: hash.id,
            transaction_id: hash.transaction_id,
            createdAt: new Date(hash.createdAt),
            pdf_link: hash.pdf_link
        })
    }
}