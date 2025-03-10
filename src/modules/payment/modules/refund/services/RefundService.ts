import { RefundAbstract } from "../entity/Refund.abstract";
import { IRefundRepository } from "../repositories/contract/IRefundRepository";

export class RefundService {
    private refundRepository: IRefundRepository;

    constructor(refundRepository: IRefundRepository) {
        this.refundRepository = refundRepository;
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

            // Compare amounts beetween transaction one n a refund one

            // do a transaction with using a class from payment/cores/payment !
            
            // create refund in db and return it
            return await this.refundRepository.createRefund(refund);
        } catch (error) {
            console.error("Error creating refund in RefundService:", error);
            throw new Error("Failed to create refund.");
        }
    }
}
