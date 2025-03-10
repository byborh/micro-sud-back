import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { EscrowAbstract } from "../Escrow.abstract";
import { TStatus } from "../../contracts/TStatus";
import { EscrowContract } from "../../contracts/IEscrow";

@Entity("escrows")
export class EscrowSQLEntity  extends EscrowAbstract {
    @PrimaryColumn({ type: "varchar", length: 255 })
    id: string;

    @Column({ type: "varchar", length: 255 })
    transaction_id: string;

    @Column({ type: "int", length: 8 })
    amount: number;

    @Column({ type: "date" })
    release_date: Date;

    @Column({ type:"varchar", length: 10 })
    status: TStatus;



    constructor(data?: Partial<EscrowContract>) {
        super(
            data?.id ?? "",
            data?.transaction_id ?? "",
            data?.amount ?? 0,
            data?.release_date ?? new Date(),
            data?.status ?? "pending",
        );
        this.id = data?.id ?? "";
        this.transaction_id = data?.transaction_id ?? "";
        this.amount = data?.amount ?? 0;
        this.release_date = data?.release_date ?? new Date();
        this.status = data?.status ?? "pending";
    }
}