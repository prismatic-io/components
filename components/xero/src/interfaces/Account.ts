export interface Account {
  AccountID: string;
  Code: string;
  Name: string;
  Status: string;
  Type: string;
  TaxType: string;
  Description: string;
  Class: string;
  SystemAccount: string;
  EnablePaymentsToAccount: boolean;
  ShowInExpenseClaims: boolean;
  BankAccountType: string;
  ReportingCode: string;
  ReportingCodeName: string;
  HasAttachments: boolean;
  UpdatedDateUTC: string;
  AddToWatchlist: boolean;
}
