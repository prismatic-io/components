import { type PaymentAccount } from "./PaymentAccount";
import { type PaymentInvoice } from "./PaymentInvoice";

export interface Payment {
  PaymentID: string;
  Date: string;
  BankAmount: number;
  Amount: number;
  CurrencyRate: number;
  PaymentType: string;
  Status: string;
  UpdatedDateUTC: string;
  HasAccount: boolean;
  IsReconciled: boolean;
  Account: PaymentAccount;
  Invoice: PaymentInvoice;
  HasValidationErrors: boolean;
}
