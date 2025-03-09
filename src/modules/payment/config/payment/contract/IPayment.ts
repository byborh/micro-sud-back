import { TransactionAbstract } from "@modules/payment/modules/transaction/entity/Transaction.abstract";

export interface IPayment {
    initialize(): void;
    charge(transaction: TransactionAbstract, payment_identifier?: string): Promise<any>;
    refund(transactionId: string): Promise<any>;

    createCustomerId(email: string): Promise<string>;
    attachPaymentAccount(payment_method: string, customerId: string): Promise<boolean>;
    // ...
}