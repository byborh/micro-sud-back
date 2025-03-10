import { TCurrency } from "../../contracts/TCurrency";
import { paymentPovider } from "../../contracts/TPaymentProvider";
import { TStatus } from "../../contracts/TStatus";
import { TransactionAbstract } from "../Transaction.abstract";
import { TransactionContract } from "../../contracts/ITransaction";
import { PaymentProvider } from "@modules/payment/config/payment/contract/TPaymentProvider";

export class TransactionRedisEntity extends TransactionAbstract {
    id: string;
    amount: number;
    currency: TCurrency;
    payment_provider: paymentPovider;
    debtor_email: string;
    beneficiary_email: string;
    status: TStatus;
    transaction_date: Date;
    transaction_ref?: string;
    description?: string;
    metadata?: any;

    data: Record<string, any> | null;

    constructor(data: Partial<TransactionContract>) {
        super(
            data?.id ?? "",
            data?.amount ?? 0,
            data?.currency ?? "eur",
            data?.payment_provider ?? "stripe",
            data?.debtor_email ?? "",
            data?.beneficiary_email ?? "",
            data?.status ?? "processing",
            data?.transaction_date ?? new Date(),
            data?.description ?? "",
            data?.transaction_ref ?? "",
            data?.metadata ?? null
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
    }

    // Convert object to Redis hash
    toRedisHash(): { [key: string]: string } {
        return {
            id: this.id,
            amount: this.amount.toString(),
            currency: this.currency,
            payment_provider: this.payment_provider.toString(),
            debtor_email: this.debtor_email,
            beneficiary_email: this.beneficiary_email,
            status: this.status.toString(),
            transaction_date: this.transaction_date.toISOString(),
            transaction_ref: this.transaction_ref,
            description: this.description || "",
            metadata: this.metadata
        }
    }

    // Convert Redis hash to object
    static fromRedisHash(hash: { [key: string]: string }): TransactionRedisEntity {
        return new TransactionRedisEntity({
            id: hash.id,
            amount: parseFloat(hash.amount), // Convertir en nombre
            currency: hash.currency as TCurrency,
            payment_provider: hash.payment_provider as PaymentProvider,
            debtor_email: hash.debtor_email,
            beneficiary_email: hash.beneficiary_email,
            status: hash.status as TStatus,
            transaction_date: new Date(hash.transaction_date),
            transaction_ref: hash.transaction_ref || undefined,
            description: hash.description || undefined,
            metadata: JSON.parse(hash.metadata || '{}'),
        })
    }
}