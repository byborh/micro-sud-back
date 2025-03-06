import { TStatus } from "./TStatus";

export interface EscrowContract {
    id: string;
    transaction_id: string;
    amount: number;
    release_date: Date;
    status: TStatus;
}