export interface GoogleAdsSearchResponse<T> {
  results?: T[];
  nextPageToken?: string;
  fieldMask?: string;
  queryResourceConsumption?: string;
}

export interface SearchGoogleAdsOptions {
  customerId: string;
  params: Record<string, unknown>;
  fetchAll: boolean;
}

export interface SearchStreamBatch {
  results?: unknown[];
  fieldMask?: string;
  summaryRow?: unknown;
  requestId?: string;
}

export interface SearchStreamResult {
  results: unknown[];
  fieldMask?: string;
  requestId?: string;
  summaryRow?: unknown;
}
