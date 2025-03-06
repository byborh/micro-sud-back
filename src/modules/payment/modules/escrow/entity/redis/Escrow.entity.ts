import { TStatus } from "../../contracts/TStatus";
import { EscrowAbstract } from "../Escrow.abstract";
import { EscrowContract } from "../../contracts/IEscrow";

export class EscrowRedisEntity extends EscrowAbstract {
    id: string;
    transaction_id: string;
    amount: number;
    release_date: Date;
    status: TStatus;

    data: Record<string, any> | null;

    constructor(data: Partial<EscrowContract>) {
        super(
            data?.id ?? "",
            data?.transaction_id ?? "",
            data?.amount ?? 0,
            data?.release_date ?? new Date(),
            data?.status ?? "pending"
        );
        
    }

    // Convert object to Redis hash
    toRedisHash(): { [key: string]: string } {
        return {
            id: this.id,
            transaction_id: this.transaction_id,
            amount: this.amount.toString(),
            release_date: this.release_date.toISOString(),
            status: this.status.toString(),
        }
    }

    // Convert Redis hash to object
    static fromRedisHash(hash: { [key: string]: string }): EscrowRedisEntity {
        return new EscrowRedisEntity({
            id: hash.id,
            transaction_id: hash.transaction_id,
            amount: parseFloat(hash.amount),
            release_date: new Date(hash.release_date),
            status: hash.status as TStatus,
        })
    }
}