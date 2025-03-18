import { Column, Entity, ObjectIdColumn, OneToMany } from "typeorm";
import { TransactionAbstract } from "../Transaction.abstract";
import { TransactionContract } from "../../contracts/ITransaction";
import { TStatus, TEscrowStatus } from "../../contracts/TStatus";
import { PaymentProvider } from "@modules/payment/config/payment/contract/TPaymentProvider";
import { TCurrency } from "../../contracts/TCurrency";

@Entity("roles")
export class TransactionMongoEntity extends TransactionAbstract {
    @Column({ unique: true })
    id!: string;

    @Column({ })
    amount!: number;

    @Column({ enum: ['USD', 'EUR', 'GBP'] })
    currency!: TCurrency;

    @Column({ enum: ['Stripe', 'Paypal', 'BankTransfer'] })
    payment_provider!: PaymentProvider;

    @Column({ })
    debtor_email!: string;

    @Column({ })
    beneficiary_email!: string;

    @Column({ enum: ['pending', 'completed', 'failed'] })
    status!: TStatus;

    @Column({ })
    transaction_date!: Date;

    @Column({ type: "boolean" })
    is_escrow: boolean;
    
    @Column({ type: "date" })
    release_date: Date;

    @Column()
    transaction_ref?: string;

    @Column()
    description?: string;

    @Column()
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