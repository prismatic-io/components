export interface CurrencySummary {
  id: string;
  descriptor?: string;
  code?: string;
}

export interface CustomerInvoiceSummary {
  id: string;
  invoiceNumber: string;
}

export interface CustomerSummary {
  id: string;
  descriptor?: string;
  name?: string;
  Customer_ID?: string;
}

export interface MessageTemplateSummary {
  id: string;
  name: string;
}

export interface PersonSummary {
  id: string;
}

export interface PrismAnalyticsSummary {
  id: string;
  displayName: string;
}

export interface WorkdayInstanceSummary {
  id: string;
  descriptor: string;
}

export interface WorkdayWorkerSummary {
  id: string;
  descriptor: string;
}
