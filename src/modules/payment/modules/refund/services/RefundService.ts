import { getPaymentProvider } from "@modules/payment/config/payment/PaymentFactory";
import { ITransactionRepository } from "../../transaction/repositories/contract/ITransactionRepository";
import { RefundAbstract } from "../entity/Refund.abstract";
import { IRefundRepository } from "../repositories/contract/IRefundRepository";

export class RefundService {
    private refundRepository: IRefundRepository;
    private transactionRepository: ITransactionRepository; // à corriger
    private paymentProvider = getPaymentProvider();

    constructor(refundRepository: IRefundRepository) {
        this.refundRepository = refundRepository;
        this.paymentProvider.isInitialize();
    }

    // Get Refund By Id
    public async getRefundById(refundId: string): Promise<RefundAbstract | null> {
        try {
            return await this.refundRepository.getRefundById(refundId);
        } catch (error) {
            console.error("Error finding refund in RefundService:", error);
            throw new Error("Failed to find refund.");
        }
    }

    // Get All Refunds
    public async getRefunds(): Promise<RefundAbstract[] | null> {
        try {
            return await this.refundRepository.getRefunds();
        } catch (error) {
            console.error("Error finding all refunds in RefundService:", error);
            throw new Error("Failed to find all refunds.");
        }
    }


    // Create Refund
    public async createRefund(refund: RefundAbstract): Promise<RefundAbstract | null> {
        try {
            // La logique de remboursement.

            // Verify if transaction existe:
            // --- Or juste get a transaction by id n if it's nil, so, return error
            // transaction can be do only if transaction status is "succeeded"
            const transaction = await this.transactionRepository.getTransactionById(refund.transaction_id);
            if(!transaction || transaction.status !== "succeeded") return null;

            // Compare amounts beetween transaction one n a refund one
            if(transaction.amount < refund.amount) return null;

            // do a transaction with using a class from payment/cores/payment !
            const createdRefund = await this.paymentProvider.refund(transaction.id);

            // create refund in db and return it
            return await this.refundRepository.createRefund(createdRefund);
        } catch (error) {
            console.error("Error creating refund in RefundService:", error);
            throw new Error("Failed to create refund.");
        }
    }
}
