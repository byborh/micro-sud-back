import { TCurrency } from "./TCurrency";
import { paymentPovider } from "./TPaymentProvider";
import { TStatus } from "./TStatus";


export interface TransactionContract {
  id: string;                         // UUID
  amount: number;                     // CENT        - Amount of the transaction
  currency: TCurrency;                // TCurrency   - Currency of the transaction (USD, EUR, etc.)
  payment_provider: paymentPovider;   // STRING      - Payment method of the transaction (Stripe, Paypal, etc.)
  debtor_email: string;               // STRING      - Debtor of the transaction
  beneficiary_email: string;          // STRING      - Beneficiary of the transaction
  status: TStatus;                    // TStatus     - Status of the transaction (pending, completed, failed)
  transaction_date: Date;             // TIMESTAMP   - Date of the transaction
  transaction_ref?: string;           // STRING      - Reference of the transaction (Stripe ID, Paypal ID, etc.)
  description?: string;               // TEXT        - Description of the transaction
  metadata?: any;                     // JSON        - Metadata of the transaction
}