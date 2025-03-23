import { RefundAbstract } from "@modules/payment/modules/refund/entity/Refund.abstract";
import { TransactionAbstract } from "@modules/payment/modules/transaction/entity/Transaction.abstract";

export interface IPayment {
    isInitialize(): Promise<void>;
    directPayment(transaction: TransactionAbstract, payment_identifier: string): Promise<any>;
    generateLinkForPayment(transaction: TransactionAbstract,): Promise<any>;
    refund(refund: RefundAbstract): Promise<any>;
    releaseEscrowPayments(pendingTransactions: TransactionAbstract[]): Promise<any>;

    createCustomerId(email: string): Promise<string>;
    attachPaymentAccount(payment_method: string, customerId: string): Promise<boolean>;
    cancelTransaction(paymentIntentId: string): Promise<boolean>;
    // ...
}