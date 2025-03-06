import { TCurrency } from "../../contracts/TCurrency";
import { PaymentMethod } from "../../contracts/TPaymentMethod";
import { TStatus } from "../../contracts/TStatus";
import { TransactionAbstract } from "../Transaction.abstract";
import { TransactionContract } from "../../contracts/ITransaction";

export class TransactionRedisEntity extends TransactionAbstract {
    id: string;
    amount: number;
    currency: TCurrency;
    payment_method: PaymentMethod;
    debtor_id: string;
    beneficiary_id: string;
    status: TStatus;
    transaction_date: Date;
    transaction_ref: string;
    description?: string;
    metadata?: any;

    data: Record<string, any> | null;

    constructor(data: Partial<TransactionContract>) {
        super(
            data?.id ?? "",
            data?.amount ?? 0,
            data?.currency ?? "eur",
            data?.payment_method ?? "stripe",
            data?.debtor_id ?? "",
            data?.beneficiary_id ?? "",
            data?.status ?? "pending",
            data?.transaction_date ?? new Date(),
            data?.description ?? "",
            data?.transaction_ref ?? "",
            data?.metadata ?? null
        );
        
    }

    // Convert object to Redis hash
    toRedisHash(): { [key: string]: string } {
        return {
            id: this.id,
            amount: this.amount.toString(),
            currency: this.currency,
            payment_method: this.payment_method.toString(),
            debtor_id: this.debtor_id,
            beneficiary_id: this.beneficiary_id,
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
            amount: parseFloat(hash.amount),
            currency: hash.currency as TCurrency,
            payment_method: hash.payment_method as PaymentMethod,
            debtor_id: hash.debtor_id,
            beneficiary_id: hash.beneficiary_id,
            status: hash.status as TStatus,
            transaction_date: new Date(hash.transaction_date),
            transaction_ref: hash.transaction_ref,
            description: hash.description,
            metadata: hash.metadata
        })
    }
}