export interface NetSuiteErrorDetail {
  detail?: string;
  "o:errorCode"?: string;
  "o:errorPath"?: string;
}

export interface NetSuiteErrorBody {
  "o:errorDetails"?: NetSuiteErrorDetail[];
}

export interface HandledHttpError {
  message: string;
  data?: unknown;
  status?: number;
  headers?: unknown;
}

export interface RetryableHttpError {
  config?: { method?: string };
  response?: { status?: number };
}
