import { getPaymentProvider } from "@modules/payment/config/payment/PaymentFactory";
import { ITransactionRepository } from "../../transaction/repositories/contract/ITransactionRepository";
import { RefundAbstract } from "../entity/Refund.abstract";
import { IRefundRepository } from "../repositories/contract/IRefundRepository";
import { getRepository } from "@core/db/databaseGuards";
import { TransactionRepositoryMongo } from "../../transaction/repositories/drivers/TransactionRepositoryMongo";
import { TransactionRepositoryRedis } from "../../transaction/repositories/drivers/TransactionRepostoryRedis";
import { TransactionRepositorySQL } from "../../transaction/repositories/drivers/TransactionRepositorySQL";
import { getDatabase } from "@db/DatabaseClient";
import { TransactionAbstract } from "../../transaction/entity/Transaction.abstract";

export class RefundService {
    private refundRepository: IRefundRepository;
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
            // Get transaction repository
            const myDB = await getDatabase();
            const transactionRepository: ITransactionRepository = await getRepository(myDB, TransactionRepositorySQL, TransactionRepositoryRedis, TransactionRepositoryMongo) as ITransactionRepository;

            // Verify if transaction existe and if is succeeded:
            const transaction = await transactionRepository.getTransactionById(refund.transaction_id);
            if(!transaction || transaction.status !== "succeeded") return null;

            // Set transaction id in refund
            refund.transaction_ref = transaction.transaction_ref;

            // Get charge id and set it in refund
            refund.charge_ref = transaction.metadata.charge_id;

            // Compare amounts beetween transaction one n a refund one
            if(transaction.amount < refund.amount) {
                // Refund with correct amount !
                refund.amount = transaction.amount;
            }

            // Refund transaction using payment provider
            const createdRefund = await this.paymentProvider.refund(refund);

            refund.status = createdRefund.status;
            refund.refund_ref = createdRefund.id;

            // Mettre à jour Transaction si c'est remboursé !

            // create refund in db and return it
            return await this.refundRepository.createRefund(refund);
        } catch (error) {
            console.error("Error creating refund in RefundService:", error);
            throw new Error("Failed to create refund.");
        }
    }
}
