export interface LogContract {
  id: string;
  user_id: string;
  action: string;
  details: string;
  createdAt: Date;
}