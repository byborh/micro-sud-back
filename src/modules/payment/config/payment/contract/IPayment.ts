import { PaymentMethod } from "@modules/payment/modules/transaction/contracts/TPaymentMethod";

export interface IPayment {
    initialize(): void;
    charge(amount: number, currency: string, beneficiary_id: string): Promise<any>;
    refund(transactionId: string): Promise<any>;

    createCustomerId(email: string): Promise<string>;
    // ...
}