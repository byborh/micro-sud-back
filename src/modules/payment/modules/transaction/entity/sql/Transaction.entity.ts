import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { TransactionAbstract } from "../Transaction.abstract";
import { TCurrency } from "../../contracts/TCurrency";
import { paymentPovider } from "../../contracts/TPaymentProvider";
import { TStatus, TEscrowStatus } from "../../contracts/TStatus";
import { TransactionContract } from "../../contracts/ITransaction";

@Entity("transactions")
export class TransactionSQLEntity  extends TransactionAbstract {
    @PrimaryColumn({ type: "varchar", length: 255 })
    id: string;

    @Column({ type: "int", length: 8 })
    amount: number;

    @Column({ type: "varchar", length: 3 })
    currency: TCurrency;

    @Column({ type: "varchar", length: 50 })
    payment_provider: paymentPovider;

    @Column({ type: "varchar", length: 255 })

    @Column({ type: "varchar", length: 255 })
    debtor_email: string;

    @Column({ type: "varchar", length: 255 })
    beneficiary_email: string;

    @Column({ type:"varchar", length: 10 })
    status: TStatus;

    @Column({ type: "date" })
    transaction_date: Date;

    @Column({ type: "boolean" })
    is_escrow: boolean;
    
    @Column({ type: "date" })
    release_date: Date;

    @Column({ type: "varchar", length: 255 })
    transaction_ref?: string;

    @Column({ type: "varchar", length: 255 })
    description?: string;
    
    @Column('json', { nullable: true })
    metadata?: any;

    @Column({ type:"varchar", length: 10 })
    escrow_status?: TEscrowStatus;

    constructor(data?: Partial<TransactionContract>) {
        super(
            data?.id ?? "",
            data?.amount ?? 0,
            data?.currency ?? "eur",
            data?.payment_provider ?? "stripe",
            data?.debtor_email ?? "",
            data?.beneficiary_email ?? "",
            data?.status ?? "processing",
            data?.transaction_date ?? new Date(),
            data?.is_escrow ?? false,
            data?.release_date ?? null,
            data?.description ?? "",
            data?.transaction_ref ?? "",
            data?.metadata ?? null,
            data?.escrow_status ?? null,
        );
        this.id = data?.id ?? "";
        this.amount = data?.amount ?? 0;
        this.currency = data?.currency ?? "eur";
        this.payment_provider = data?.payment_provider ?? "stripe";
        this.debtor_email = data?.debtor_email ?? "";
        this.beneficiary_email = data?.beneficiary_email ?? "";
        this.status = data?.status ?? "processing";
        this.transaction_date = data?.transaction_date ?? new Date();
        this.description = data?.description ?? "";
        this.transaction_ref = data?.transaction_ref ?? "";
        this.metadata = data?.metadata ?? null;
        this.is_escrow = data?.is_escrow ?? false;
        this.escrow_status = data?.escrow_status ?? null;
        this.release_date = data?.release_date ?? null;
    }
}