import { Column, Entity, PrimaryColumn } from "typeorm";
import { InvoiceAbstract } from "../Invoice.abstract";
import { InvoiceContract } from "../../contracts/IInvoice";

@Entity("invoices")
export class InvoiceSQLEntity  extends InvoiceAbstract {
    @PrimaryColumn({ type: "varchar", length: 255 })
    id: string;

    @Column({ type: "varchar", length: 255 })
    transaction_id: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
    
    @Column({ type: "varchar", length: 255 })
    pdf_link: string;


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
}