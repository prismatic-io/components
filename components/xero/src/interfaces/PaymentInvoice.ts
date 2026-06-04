import { type Contact } from "./Contact";

export interface PaymentInvoice {
  Type: string;
  InvoiceID: string;
  InvoiceNumber: string;
  Payments: unknown[];
  CreditNotes: unknown[];
  Prepayments: unknown[];
  Overpayments: unknown[];
  IsDiscounted: boolean;
  InvoiceAddresses: unknown[];
  HasErrors: boolean;
  InvoicePaymentServices: unknown[];
  Contact: Partial<Contact>;
  LineItems: unknown[];
  CurrencyCode: string;
}
