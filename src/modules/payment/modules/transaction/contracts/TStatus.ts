// Status of a transaction
export type TStatus= 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'succeeded' | 'failed' | 'requires_capture' | 'cancelled';

export type TEscrowStatus = 'pending' | 'released' | 'refunded' |'disputed';