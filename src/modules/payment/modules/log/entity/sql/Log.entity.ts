import { Column, Entity, PrimaryColumn } from "typeorm";
import { LogAbstract } from "../Log.abstract";
import { LogContract } from "../../contracts/ILog";

@Entity("logs")
export class LogSQLEntity extends LogAbstract {
    @PrimaryColumn({ type: "varchar", length: 255 })
    id: string;

    @Column({ type: "varchar", length: 255 })
    user_id: string;

    @Column({ type: "varchar", length: 255 })
    action: string;

    @Column({ type: "varchar", length: 255 })
    details: string;
    
    @Column({ type: "date" })
    createdAt: Date;

    constructor(data: Partial<LogContract>) {
        super(
            data?.id ?? "",
            data?.user_id ?? "",
            data?.action ?? "",
            data?.details ?? "",
            data?.createdAt ?? new Date()
        );
        this.id = data?.id ?? "";
        this.user_id = data?.user_id ?? "";
        this.action = data?.action ?? "";
        this.details = data?.details ?? "";
        this.createdAt = data?.createdAt ?? new Date();
    }
}