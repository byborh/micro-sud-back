import { EscrowAbstract } from "../entity/Escrow.abstract";
import { IEscrowRepository } from "../repositories/contract/IEscrowRepository";

export class EscrowService {
    private escrowRepository: IEscrowRepository;

    constructor(escrowRepository: IEscrowRepository) {
        this.escrowRepository = escrowRepository;
    }

    // Get Escrow By Id
    public async getEscrowById(escrowId: string): Promise<EscrowAbstract | null> {
        try {
            return await this.escrowRepository.getEscrowById(escrowId);
        } catch (error) {
            console.error("Error finding escrow in EscrowService:", error);
            throw new Error("Failed to find escrow.");
        }
    }


    // Get All Escrows
    public async getEscrows(): Promise<EscrowAbstract[] | null> {
        try {
            return await this.escrowRepository.getEscrows();
        } catch (error) {
            console.error("Error finding all escrows in EscrowService:", error);
            throw new Error("Failed to find all escrows.");
        }
    }


    // Create Escrow
    public async createEscrow(escrow: EscrowAbstract): Promise<EscrowAbstract | null> {
        try {
            return await this.escrowRepository.createEscrow(escrow);
        } catch (error) {
            console.error("Error creating escrow in EscrowService:", error);
            throw new Error("Failed to create escrow.");
        }
    }

    // Create Escrow
    public async releaseEscrow(escrow: EscrowAbstract): Promise<EscrowAbstract | null> {
        try {
            return await this.escrowRepository.releaseEscrow(escrow);
        } catch (error) {
            console.error("Error creating escrow in EscrowService:", error);
            throw new Error("Failed to create escrow.");
        }
    }
}
