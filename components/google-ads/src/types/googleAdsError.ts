export interface GoogleAdsErrorEntry {
  errorCode?: Record<string, string>;
  message?: string;
}

interface GoogleApiFieldViolation {
  field?: string;
  description?: string;
}

export interface GoogleAdsErrorDetail {
  errors?: GoogleAdsErrorEntry[];
  fieldViolations?: GoogleApiFieldViolation[];
  requestId?: string;
}

export interface GoogleAdsErrorBody {
  error?: { message?: string; details?: GoogleAdsErrorDetail[] };
  message?: string;
  details?: GoogleAdsErrorDetail[];
}

export interface GoogleAdsHttpError {
  config?: { method?: string; url?: string };
  response?: { data?: unknown };
}

export interface HandledHttpError {
  message: string;
  data?: unknown;
  status?: number;
  headers?: unknown;
}
