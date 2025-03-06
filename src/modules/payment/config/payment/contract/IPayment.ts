export interface IPayment {
    initialize(): void;
    charge(amount: number, currency: string, beneficiary_id: string): Promise<any>;
    refund(transactionId: string): Promise<any>;
    // ...
}