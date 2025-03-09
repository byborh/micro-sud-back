import { TransactionAbstract } from "@modules/payment/modules/transaction/entity/Transaction.abstract";

export interface IPayment {
    initialize(): void;
    directPayment(transaction: TransactionAbstract, payment_identifier: string): Promise<any>;
    generateLinkForPayment(transaction: TransactionAbstract,): Promise<any>;
    refund(transactionId: string): Promise<any>;

    createCustomerId(email: string): Promise<string>;
    attachPaymentAccount(payment_method: string, customerId: string): Promise<boolean>;
    // ...
}