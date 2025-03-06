import { TStatus } from "./TStatus";

export interface RefundContract {
  id: string;
  transaction_id: string;
  amount: number;
  status: TStatus;
}