import { RefundAbstract } from "../../entity/Refund.abstract";

export interface IRefundRepository {
    getRefundById(refundId: string): Promise<RefundAbstract | null>;
    getRefunds(): Promise<RefundAbstract[] | null>;
    createRefund(refund: RefundAbstract): Promise<RefundAbstract | null>;
}