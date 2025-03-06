import { EscrowAbstract } from "../../entity/Escrow.abstract";

export interface IEscrowRepository {
    getEscrowById (userId: string): Promise<EscrowAbstract | null>;
    getEscrows(): Promise<EscrowAbstract[] | null>;
    createEscrow(escrow: EscrowAbstract): Promise<EscrowAbstract | null>;
    releaseEscrow(escrow: EscrowAbstract): Promise<EscrowAbstract | null>;
}