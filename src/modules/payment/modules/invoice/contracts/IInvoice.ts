export interface InvoiceContract {
  id: string;
  transaction_id: string;
  createdAt: Date;
  pdf_link?: string;
}