import Stripe from "stripe";
import { IPayment } from "../contract/IPayment";
import { TransactionAbstract } from "@modules/payment/modules/transaction/entity/Transaction.abstract";
import { RefundAbstract } from "@modules/payment/modules/refund/entity/Refund.abstract";

export class StripePayment implements IPayment {
    private stripe: Stripe;

    constructor() {
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
            apiVersion: "2025-02-24.acacia"
        })
    }

    async isInitialize(): Promise<void> {
        console.log("Stripe initialized.");
    }

    /**
     * Creates a Payment Intent for the given transaction and payment method.
     * This should be used when the user has chosen to pay directly with a saved payment method.
     * @param transaction The transaction object to create the Payment Intent for.
     * @param payment_identifier The identifier for the payment method to use for the payment.
     * @returns The created Payment Intent.
     */
    async directPayment(transaction: TransactionAbstract, payment_identifier: string): Promise<any> {

        const returnUrl = process.env.NODE_ENV === 'production'
        ? 'https://your-production-app.com/payment/return' // URL de production
        : 'https://your-development-app.com/payment/return'; // URL de développement

        const paymentIntent = await this.stripe.paymentIntents.create({
            amount: transaction.amount,
            currency: transaction.currency,
            customer: transaction.transaction_ref,
            payment_method: payment_identifier,
            confirm: true,
            description: transaction.description,
            metadata: {
                transaction_id: transaction.id,
                beneficiary_email: transaction.beneficiary_email,
                debtor_email: transaction.debtor_email,
            },
            return_url: returnUrl
        });

        return paymentIntent;
    }


    /**
     * Generates a link for a payment, to be redirected to Stripe's Checkout UI.
     * @param transaction The transaction object to generate the link for.
     * @returns An object with a `url` property pointing to the Stripe Checkout UI.
     */
    async generateLinkForPayment(transaction: TransactionAbstract): Promise<any> {
        const returnUrl = process.env.NODE_ENV === 'production'
        ? 'https://your-production-app.com/payment/return' // URL de production
        : 'https://your-development-app.com/payment/return'; // URL de développement
        
        const session = await this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            customer_email: transaction.debtor_email,
            line_items: [
                {
                    price_data: {
                        currency: transaction.currency,
                        product_data: {
                            name: transaction.description,
                        },
                        unit_amount: transaction.amount,
                    },
                    quantity: 1,
                },
            ],
            success_url: returnUrl + '?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: returnUrl + '?canceled=true',
            metadata: {
                transaction_id: transaction.id,
                beneficiary_email: transaction.beneficiary_email,
                debtor_email: transaction.debtor_email,
            },
        });

        return session;
        
    }

    // à modifier !
    async refund(refund: RefundAbstract): Promise<any> {
        try {
            const refundComplete = await this.stripe.refunds.create({
                charge: refund.charge_ref,
                amount: refund.amount
            });
            
            return refundComplete;
        } catch (error) {
            console.error("Erreur lors du remboursement:", error);
            throw error;
        }
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


    async cancelTransaction(paymentIntentId: string): Promise<boolean> {
        try {
            const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);
    
            // Vérifier si le paiement peut être annulé
            if (paymentIntent.status === 'requires_payment_method' || 
                paymentIntent.status === 'requires_confirmation' || 
                paymentIntent.status === 'processing') {
    
                await this.stripe.paymentIntents.cancel(paymentIntentId);
                return true;
            }
    
            console.warn(`Impossible d'annuler PaymentIntent ${paymentIntentId} (statut : ${paymentIntent.status}).`);
            return false;
    
        } catch (error) {
            console.error("Erreur lors de l'annulation du paiement:", error);
            throw error;
        }
    }    
}