export interface Invoice {
  InvoiceKey: string;
  InvoiceNumber: string;
  TotalAmountDue: number;
  InvoiceTotal: number;
  InvoiceSubTotal: number;
  InvoiceTaxTotal: number;
  InvoiceDate: string;
  PaymentDueDate: string;
  UpdatedAt: string;
  CurrencyCode: string;
  PaymentInstructions: string | null;
  InvoiceStatus: string;
}
