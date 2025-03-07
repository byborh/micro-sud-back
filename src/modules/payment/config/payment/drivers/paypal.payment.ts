import { IPayment } from "../contract/IPayment";

export class PaypalPayment implements IPayment {

    async initialize(): Promise<void> {
        console.log("PayPal initialized.");
    }

    async charge(amount: number, currency: string, customerId: string): Promise<any> {
        return { success: true, message: "Payment processed via PayPal." };
    }

    async refund(paymentId: string): Promise<any> {
        return { success: true, message: `Refund processed for ${paymentId} via PayPal.` };
    }

    async createCustomerId(email: string): Promise<any> {
        return { success: true, message: `Customer created for ${email} via PayPal.` };
    }
}