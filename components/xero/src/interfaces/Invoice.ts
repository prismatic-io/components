import { type Contact } from "./Contact";

export interface Invoice {
  Type: string;
  InvoiceID: string;
  InvoiceNumber: string;
  Reference: string;
  Payments: unknown[];
  CreditNotes: unknown[];
  Prepayments: unknown[];
  Overpayments: unknown[];
  AmountDue: number;
  AmountPaid: number;
  AmountCredited: number;
  SentToContact: boolean;
  CurrencyRate: number;
  IsDiscounted: boolean;
  HasAttachments: boolean;
  InvoiceAddresses: unknown[];
  HasErrors: boolean;
  InvoicePaymentServices: unknown[];
  Contact: Partial<Contact>;
  DateString: string;
  Date: string;
  DueDateString: string;
  DueDate: string;
  BrandingThemeID: string;
  Status: string;
  LineAmountTypes: string;
  LineItems: unknown[];
  SubTotal: number;
  TotalTax: number;
  Total: number;
  UpdatedDateUTC: string;
  CurrencyCode: string;
}
