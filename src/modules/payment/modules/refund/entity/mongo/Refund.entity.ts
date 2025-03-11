import { Column, Entity, ObjectIdColumn } from "typeorm";
import { RefundContract } from "../../contracts/IRefund";
import { TStatus } from "../../contracts/TStatus";
import { RefundAbstract } from "../Refund.abstract";

@Entity("roles")
export class RefundMongoEntity extends RefundAbstract {
    @ObjectIdColumn({ type: "varchar", length: 255 })
    id: string;

    @Column({ type:"varchar", length: 255 })
    transaction_id: string;

    @Column({ type: "int", length: 8 })
    amount: number;

    @Column({ type: "varchar", length: 10 })
    status: TStatus;

    constructor(data?: Partial<RefundContract>) {
        super(
            data?.id ?? "",
            data?.transaction_id ?? "",
            data?.amount ?? 0,
            data?.status ?? "pending",
            );
        this.id = data?.id ?? "";
        this.transaction_id = data?.id ?? "";
        this.amount = data?.amount ?? 0;
        this.status = data?.status ?? "pending";
    }
}