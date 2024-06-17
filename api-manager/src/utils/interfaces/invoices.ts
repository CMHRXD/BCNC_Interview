import { status } from "../enums/status";

export interface invoices {
  invoice_id: number;
  customer: string;
  amount_due: number;
  date_issued: Date;
  status: status;
}
