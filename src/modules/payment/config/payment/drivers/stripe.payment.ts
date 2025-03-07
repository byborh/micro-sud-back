import Stripe from "stripe";
import { IPayment } from "../contract/IPayment";

export class StripePayment implements IPayment {
    private stripe: Stripe;

    constructor() {
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
            apiVersion: "2025-02-24.acacia"
        })
    }

    initialize(): void {
        console.log("Stripe initialized.");
    }

    async charge(amount: number, currency: string, beneficiary_id: string): Promise<any> {
        return await this.stripe.paymentIntents.create({
            amount,
            currency,
            customer: beneficiary_id
        });
    }

    async refund(paymentId: string): Promise<any> {
        return await this.stripe.refunds.create({ payment_intent: paymentId });
    }


    // Create an id stripe for customer
    async createCustomerId(email: string, name: string): Promise<any> {
        const customer = await this.stripe.customers.create({
            email,
            name
        })

        return customer;
        // customer.id
    }
}