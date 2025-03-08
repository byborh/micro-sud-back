import Stripe from "stripe";
import { IPayment } from "../contract/IPayment";
import { TransactionAbstract } from "@modules/payment/modules/transaction/entity/Transaction.abstract";

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

    async charge(transaction: TransactionAbstract, payment_identifier: string): Promise<any> {
        const paymentIntent = await this.stripe.paymentIntents.create({
            amount: transaction.amount,
            currency: transaction.currency,
            customer: transaction.transaction_ref,
            payment_method: payment_identifier,
            confirm: true, // Confirm the payment intent
            description: transaction.description,
            return_url: "https://example.com/return",
            metadata: {
                transaction_id: transaction.id,
                beneficiary_email: transaction.beneficiary_email,
                debtor_email: transaction.debtor_email,
            }
        });

        return paymentIntent;
    }

    async refund(paymentId: string): Promise<any> {
        return await this.stripe.refunds.create({ payment_intent: paymentId });
    }


    /**
     * Creates a new Stripe customer and returns the customer's ID.
     * @param email The email address of the user to create a customer for.
     * @returns The ID of the customer created.
     */
    async createCustomerId(email: string): Promise<string> {
        try {
            return (await this.stripe.customers.create({email})).id;
        } catch (error) {
            console.error("Error creating user's Stripe account:", error);
        }
    }



    /**
     * Attaches a payment method to a Stripe customer and sets it as the default.
     * @param payment_method The payment method to attach to the customer.
     * @param customerId The ID of the customer to attach the payment method to.
     * @returns True if the payment method was successfully attached, false otherwise.
     */
    async attachPaymentAccount(payment_method: string, customerId: string): Promise<boolean> {
        try {
            // Attach the payment method to the customer
            const result = await this.stripe.paymentMethods.attach(payment_method, { customer: customerId })

            // Define default payment method for customer
            const defaultPaymentMethod = await this.stripe.customers.update(customerId, {
                invoice_settings: { default_payment_method: payment_method }
            });

            return result.id && defaultPaymentMethod.id ? true : false;
        } catch (error) {
            console.error("Error attaching payment method to user's Stripe account:", error);
        }
    }
}