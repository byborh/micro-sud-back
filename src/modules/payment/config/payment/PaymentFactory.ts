import { IPayment } from "./contract/IPayment";
import { PaymentProvider } from "./contract/TPaymentProvider"
import { PaypalPayment } from "./drivers/paypal.payment";
import { StripePayment } from "./drivers/stripe.payment";

export const getPaymentProvider = (): IPayment => {
    const paymentProvider: PaymentProvider = process.env.PAYMENT_PROVIDER as PaymentProvider || "stripe"; // default to Stripe

    if(paymentProvider === "stripe") {
        return new StripePayment();
    }
    
    return new PaypalPayment();
}