export interface InvoiceContract {
  id: string;
  transaction_id: string;
  user_id: string;
  amount: number;
  pdf_link: string;
}