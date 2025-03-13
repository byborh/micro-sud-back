import { Column, Entity, PrimaryColumn } from "typeorm";
import { RefundAbstract } from "../Refund.abstract";
import { TStatus } from "../../contracts/TStatus";
import { RefundContract } from "../../contracts/IRefund";

@Entity("refunds")
export class RefundSQLEntity  extends RefundAbstract {
    @PrimaryColumn({ type: "varchar", length: 255 })
    id: string;

    @Column({ type:"varchar", length: 255 })
    transaction_id: string;

    @Column({ type:"varchar", length: 255 })
    transaction_ref: string;

    @Column({ type:"varchar", length: 255 })
    charge_ref: string;

    @Column({ type: "varchar", length: 10 })
    status: TStatus;

    @Column({ type: "int", length: 8 })
    amount: number;

    @Column({ type: "varchar", length: 255 })
    refund_ref: string;

    @Column({ type: "date"})
    createdAt: Date;

    constructor(data: Partial<RefundContract>) {
        super(
            data?.id ?? "",
            data?.transaction_id ?? "",
            data?.transaction_ref ?? "",
            data?.charge_ref ?? "",
            data?.status ?? "pending",
            data?.createdAt ?? new Date(),
            data?.amount ?? 0,
            data?.refund_ref ?? "",
        );
        this.id = data?.id ?? "",
        this.transaction_id = data?.transaction_id ?? "",
        this.transaction_ref = data?.transaction_ref ?? "",
        this.charge_ref = data?.charge_ref ?? "",
        this.amount = data?.amount ?? 0,
        this.status = data?.status ?? "pending",
        this.refund_ref = data?.refund_ref ?? "",
        this.createdAt = data?.createdAt ?? new Date()
    }
}