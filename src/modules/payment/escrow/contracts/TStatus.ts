

export type TStatus = 'pending' | 'held' | 'processing' | 'released' | 'cancelled' | 'rejected' | 'completed' | 'disputed' | 'refunded';


/*
    pending / waiting - Pour les paiements en attente de validation ou de traitement initial
    held / blocked - Pour les fonds bloqués dans l'escrow
    processing - Pendant le traitement du paiement
    released - Lorsque les fonds sont libérés vers le bénéficiaire
    cancelled / rejected - Si la transaction est annulée ou refusée
    completed - Pour les transactions terminées avec succès
    disputed - En cas de litige sur la transaction
    refunded - Si les fonds sont retournés à l'expéditeur
*/