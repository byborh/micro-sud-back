import { TStatus } from "./TStatus";

export interface RefundContract {
  id: string;
  transaction_id: string;
  transaction_ref: string;
  charge_ref: string;
  amount?: number;
  status: TStatus;
  refund_ref?: string;
  createdAt: Date;
}